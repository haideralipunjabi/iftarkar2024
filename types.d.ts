import timings from "@/data/timings.json";
export type TimingKeys = keyof typeof timings;
export type OffsetType = (typeof timings.raheemiya.offsets)[0];
