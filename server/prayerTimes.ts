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

function addMinutes(timeStr: string, minutes: number): string {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return timeStr;
  let [, hourStr, minStr, period] = match;
  let hour = parseInt(hourStr, 10);
  let min = parseInt(minStr, 10);
  if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  const totalMin = hour * 60 + min + minutes;
  let newHour = Math.floor(totalMin / 60) % 24;
  const newMin = totalMin % 60;
  const newPeriod = newHour >= 12 ? "PM" : "AM";
  if (newHour === 0) newHour = 12;
  else if (newHour > 12) newHour -= 12;
  return `${newHour}:${String(newMin).padStart(2, '0')} ${newPeriod}`;
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
    const adhan1 = formatTime(iqamas.jummah1);
    prayers.push({ name: "Jumu'ah 1", adhan: adhan1, iqamah: addMinutes(adhan1, 30) });
  }
  if (iqamas.jummah2) {
    const adhan2 = formatTime(iqamas.jummah2);
    prayers.push({ name: "Jumu'ah 2", adhan: adhan2, iqamah: addMinutes(adhan2, 30) });
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
