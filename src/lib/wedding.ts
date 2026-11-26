export type Photo = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
};

export type Ceremony = {
  id: string;
  eyebrow: string;
  title: string;
  time: string;
  venue: string;
  address: string;
  note: string;
};

export type TimelineItem = {
  time: string;
  title: string;
  detail: string;
};

export type GiftSide = {
  id: string;
  title: string;
  owner: string;
  bank: string;
  account: string;
  /** Đường dẫn ảnh QR trong public, ví dụ "/qr/nha-trai.png". Để trống khi chưa có ảnh. */
  qr: string;
};

export type Household = {
  id: string;
  title: string;
  address: string;
  /** Link Google Maps. Để trống khi chưa có. */
  map: string;
};

function shot(file: string, width: number, height: number, alt: string): Photo {
  return {
    src: `/photos/${file}.webp`,
    thumb: `/photos/${file}-thumb.webp`,
    width,
    height,
    alt,
  };
}

/**
 * Thông tin thiệp cưới.
 * Ngày, giờ, địa điểm, tên bố mẹ, số điện thoại và tài khoản mừng cưới
 * đang để trống — điền vào các chuỗi bên dưới khi đã chốt.
 */
export const wedding = {
  groom: {
    name: "Trần Trung Hiếu",
    shortName: "Hiếu",
    role: "Chú rể",
    parents: "",
    note: "Chọn một đời bình yên, và chọn người để đi cùng.",
  },
  bride: {
    name: "Tướng Thị Quế",
    shortName: "Quế",
    role: "Cô dâu",
    parents: "",
    note: "Một nụ cười, một bó hoa, và lời hẹn ở lại.",
  },
  /** Mốc đếm ngược: đầu ngày lễ cưới, giờ Việt Nam. */
  dateISO: "2026-12-26T00:00:00+07:00",
  dateLabel: "Thứ Bảy, 26 tháng 12, 2026",
  lunarLabel: "Nhằm ngày 18 tháng 11 năm Bính Ngọ",
  /** Nơi tổ chức lễ, ví dụ: "Đà Nẵng". Bộ ảnh chụp tại Đà Nẵng, không suy ra địa điểm cưới. */
  weddingPlace: "",
  /** Khi đã có tên miền, ví dụ "https://hieuque.example.com". */
  siteUrl: "",
  contact: {
    groomPhone: "",
    bridePhone: "",
  },
  gift: {
    enabled: true,
    note: "Sự hiện diện của quý khách là niềm vui của gia đình chúng tôi.",
    sides: [
      {
        id: "nha-trai",
        title: "Nhà trai",
        owner: "Trần Trung Hiếu",
        bank: "Techcombank",
        account: "9026061997",
        qr: "/qr/nha-trai.png",
      },
      {
        id: "nha-gai",
        title: "Nhà gái",
        owner: "Tướng Thị Quế",
        bank: "Techcombank",
        account: "2006200422",
        qr: "/qr/nha-gai.png?v=2",
      },
    ] satisfies GiftSide[],
  },
  homes: [
    {
      id: "nha-trai",
      title: "Nhà trai",
      address: "Tổ dân phố Yên Đổ, phường Duy Tân, tỉnh Ninh Bình",
      map: "https://www.google.com/maps/search/?api=1&query=20.666764,106.020786",
    },
    {
      id: "nha-gai",
      title: "Nhà gái",
      address: "Thôn Khe Đảng, xã Yên Sơn, tỉnh Tuyên Quang",
      map: "https://www.google.com/maps/place/C%C3%B4ng+N%C3%B4ng+V%E1%BA%ADn+T%E1%BA%A3i+qu%E1%BA%BF+khe+%C4%90%E1%BA%A3ng/@21.8749533,105.1138581,17.68z/data=!4m6!3m5!1s0x3134ab0031115367:0xe701d111b7fd7291!8m2!3d21.874652!4d105.114103!16s%2Fg%2F11x_2y_m9f",
    },
  ] satisfies Household[],
  playlist: [
    {
      id: "hon-ca-yeu",
      title: "Hơn cả yêu",
      artist: "Đức Phúc",
      youtube: "__kGJZ-kPno",
      start: 60,
      end: 104,
    },
  ],
  events: [
    {
      id: "an-hoi",
      eyebrow: "Lễ hỏi",
      title: "Lễ ăn hỏi",
      time: "Thứ Sáu, 25 tháng 12, 2026",
      venue: "",
      address: "",
      note: "Tức ngày 17 tháng 11 năm Bính Ngọ",
    },
    {
      id: "le-cuoi",
      eyebrow: "Lễ chính",
      title: "Lễ cưới",
      time: "Thứ Bảy, 26 tháng 12, 2026",
      venue: "",
      address: "",
      note: "Tức ngày 18 tháng 11 năm Bính Ngọ",
    },
  ] satisfies Ceremony[],
  /**
   * Lịch trong ngày. Thêm từng mốc khi đã chốt, ví dụ:
   * { time: "08:30", title: "Đón khách", detail: "Tại tư gia nhà gái" }
   */
  timeline: [] as TimelineItem[],
};

export const heroPhoto = shot(
  "13x185",
  1800,
  1200,
  "Trần Trung Hiếu bế Tướng Thị Quế trong ánh hoàng hôn",
);

export const couplePhoto = shot(
  "60x902",
  1140,
  1800,
  "Chân dung cưới của Trần Trung Hiếu và Tướng Thị Quế",
);

export const quotePhoto = shot(
  "le-dsc_7000",
  1800,
  1200,
  "Hiếu và Quế nắm tay lúc trời chập choạng",
);

export const moments = [
  {
    index: "01",
    title: "Nền trắng",
    text: "Giữa phông nền trắng và một bó hoa nhỏ, hai người đứng cạnh nhau. Đơn giản, và đủ để nhớ.",
    photo: shot("13x184", 1200, 1800, "Quế trong váy ren, Hiếu mặc vest đen trên nền trắng"),
  },
  {
    index: "02",
    title: "Giữa vườn",
    text: "Cỏ, nắng và một cái ôm. Những buổi chiều đẹp thường không cần nhiều hơn thế.",
    photo: shot("13x182", 1800, 1200, "Hiếu và Quế cười cùng nhau trong khu vườn"),
  },
  {
    index: "03",
    title: "Khi trời đổ nắng",
    text: "Họ vẫn nắm tay khi bầu trời chuyển màu. Phần còn lại của câu chuyện là những ngày sẽ tới.",
    photo: shot("le-dsc_6684", 1140, 1800, "Hiếu và Quế dạo bước bên hồ lúc hoàng hôn"),
  },
];

export const gallery: Photo[] = [
  shot("le-dsc_6684", 1140, 1800, "Dạo bước bên hồ lúc hoàng hôn"),
  shot("13x185", 1800, 1200, "Bế bổng giữa trời chiều"),
  shot("13x183", 1200, 1800, "Khoảnh khắc dịu dàng trên nền sáng"),
  shot("le-qdd04660", 1800, 1200, "Bên chiếc xe cổ"),
  shot("le-qdd05362", 1200, 1800, "Nụ cười trong váy cưới"),
  shot("13x182", 1800, 1200, "Cười giữa khu vườn"),
  shot("le-dsc_6842", 1200, 1800, "Nụ hôn bên bờ nước"),
  shot("le-qdd04747", 1200, 1800, "Vẫy tay trên xe cổ"),
  shot("le-dsc_7000", 1800, 1200, "Nhảy cùng nhau lúc chập choạng"),
  shot("60x901", 1140, 1800, "Ảnh toàn thân với vest trắng"),
  shot("13x181", 1800, 1200, "Đứng cạnh xe cổ trước nhà"),
  shot("le-qdd04834", 1200, 1800, "Ngồi giữa vườn xanh"),
  shot("le-dsc_6985", 1200, 1800, "Ánh mắt lúc mặt trời lặn"),
  shot("13x184", 1200, 1800, "Váy ren và vest đen"),
  shot("le-qdd04619", 1200, 1800, "Chụp cùng chiếc xe cổ"),
  shot("le-qdd05022", 1200, 1800, "Vòng tay trên nền sáng"),
  shot("le-dsc_6634", 1140, 1800, "Cầm tay đi trên bãi cỏ"),
  shot("le-qdd04686", 1200, 1800, "Ngồi trên xe với bó hoa loa kèn"),
  shot("60x902", 1140, 1800, "Chân dung cưới vest trắng và váy đuôi cá"),
];

export const albumSpreads: Photo[] = [
  shot("25x35_09", 1800, 1259, "Trang album áo dài"),
  shot("25x35_02", 1800, 1259, "Trang album bên xe cổ"),
  shot("25x35_01", 1800, 1259, "Trang album ngoại cảnh"),
  shot("25x35_03", 1800, 1259, "Trang album trước ngôi nhà"),
  shot("25x35_07", 1800, 1259, "Trang album trong vườn"),
  shot("25x35_08", 1800, 1259, "Trang album trên ban công"),
  shot("25x35_10", 1800, 1259, "Trang album hoàng hôn"),
  shot("25x35_06", 1800, 1259, "Trang album chân dung"),
  shot("25x35_04", 1800, 1259, "Trang album trên nền sáng"),
  shot("25x35_05", 1800, 1259, "Trang album những khoảnh khắc"),
];

export function displayDate() {
  if (wedding.dateLabel.trim()) return wedding.dateLabel.trim();
  if (!wedding.dateISO.trim()) return "";
  const date = new Date(wedding.dateISO);
  if (Number.isNaN(date.getTime())) return "";
  const formatted = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/** Bản đồ nhúng ngay trên thiệp, không mở sang trang Google Maps. */
export function mapsEmbed(address: string, map = "") {
  const direct = map.trim();
  const pin = direct.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  const queryParam = direct.match(/[?&]query=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  const at = direct.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  const pair = pin || queryParam || at;
  const query = pair ? `${pair[1]},${pair[2]}` : address.trim();
  if (!query) return "";
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=vi&output=embed`;
}

export function zaloHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("84")
    ? digits
    : digits.startsWith("0")
      ? `84${digits.slice(1)}`
      : digits;
  return `https://zalo.me/${normalized}`;
}

export function weddingJsonLd() {
  if (!wedding.dateISO.trim()) return null;
  const place = wedding.weddingPlace.trim();
  const siteUrl = wedding.siteUrl.trim().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Lễ cưới của ${wedding.groom.name} và ${wedding.bride.name}`,
    description: `Trân trọng kính mời đến lễ ăn hỏi ngày 25 tháng 12 năm 2026 và lễ cưới ngày 26 tháng 12 năm 2026 của ${wedding.groom.name} và ${wedding.bride.name}.`,
    startDate: wedding.dateISO,
    endDate: "2026-12-26T23:59:59+07:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: "vi",
    ...(siteUrl
      ? {
          url: siteUrl,
          image: `${siteUrl}/photos/13x185.webp`,
        }
      : {}),
    organizer: [
      { "@type": "Person", name: wedding.groom.name },
      { "@type": "Person", name: wedding.bride.name },
    ],
    ...(place
      ? {
          location: {
            "@type": "Place",
            name: place,
            address: place,
          },
        }
      : {}),
  };
}
