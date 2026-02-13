const MASJIDAL_API = "https://masjidal.com/api/v1/time/range?masjid_id=xwLVMDKJ";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

interface PrayerTime {
  name: string;
  adhan: string;
  iqamah?: string;
}

interface CachedPrayerTimes {
  prayers: PrayerTime[];
  fetchedAt: number;
}

let cache: CachedPrayerTimes | null = null;

function formatTime(raw: string): string {
  return raw.replace(/(am|pm)$/i, (m) => ` ${m.toUpperCase()}`).replace(/\s+/g, ' ').trim();
}

async function fetchFromApi(): Promise<PrayerTime[]> {
  const res = await fetch(MASJIDAL_API);
  if (!res.ok) throw new Error(`MasjidAl API returned ${res.status}`);

  const json = await res.json();
  const adhans = json.data.salah[0];
  const iqamas = json.data.iqamah[0];
  const prayers: PrayerTime[] = [
    { name: "Fajr", adhan: formatTime(adhans.fajr), iqamah: formatTime(iqamas.fajr) },
    { name: "Sunrise", adhan: formatTime(adhans.sunrise) },
    { name: "Dhuhr", adhan: formatTime(adhans.zuhr), iqamah: formatTime(iqamas.zuhr) },
    { name: "Asr", adhan: formatTime(adhans.asr), iqamah: formatTime(iqamas.asr) },
    { name: "Maghrib", adhan: formatTime(adhans.maghrib), iqamah: formatTime(iqamas.maghrib) },
    { name: "Isha", adhan: formatTime(adhans.isha), iqamah: formatTime(iqamas.isha) },
  ];

  if (iqamas.jummah1) {
    prayers.push({ name: "Jumu'ah 1", adhan: formatTime(iqamas.jummah1), iqamah: formatTime(iqamas.jummah1) });
  }
  if (iqamas.jummah2) {
    prayers.push({ name: "Jumu'ah 2", adhan: formatTime(iqamas.jummah2), iqamah: formatTime(iqamas.jummah2) });
  }

  return prayers;
}

export async function getPrayerTimes(): Promise<PrayerTime[]> {
  const now = Date.now();

  if (cache && now - cache.fetchedAt < CACHE_DURATION_MS) {
    return cache.prayers;
  }

  try {
    const prayers = await fetchFromApi();
    cache = { prayers, fetchedAt: now };
    console.log(`[PrayerTimes] Fetched fresh prayer times at ${new Date().toISOString()}`);
    return prayers;
  } catch (error) {
    console.error("[PrayerTimes] Failed to fetch:", error);
    if (cache) {
      console.log("[PrayerTimes] Returning stale cache");
      return cache.prayers;
    }
    throw error;
  }
}

export function startPrayerTimesRefresh() {
  getPrayerTimes().catch((err) => console.error("[PrayerTimes] Initial fetch failed:", err));

  setInterval(() => {
    getPrayerTimes().catch((err) => console.error("[PrayerTimes] Refresh failed:", err));
  }, CACHE_DURATION_MS);
}
