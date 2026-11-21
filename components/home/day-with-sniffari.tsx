"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";

const moments = [
  {
    id: "departure",
    time: "9:00 AM",
    label: "Departure hunt",
    title: "The door closes. The game begins.",
    description:
      "Three pods, three rooms, one busy nose. The first scent trail turns an ordinary goodbye into the start of an adventure.",
    image: "/images/day-sniffari/dog-hunt.png",
    alt: "A dog beginning a scent hunt around the home",
    type: "hunt",
  },
  {
    id: "nap",
    time: "9:30 AM",
    label: "Quick nap",
    title: "A good day starts with a good rest.",
    description:
      "The first burst of play gives way to a proper nap. Sniffari keeps each scent trail short and satisfying, with plenty of room to settle down.",
    image: "/images/day-sniffari/relaxed-dog.png",
    alt: "A dog resting peacefully after a morning scent hunt",
    type: "rest",
  },
  {
    id: "midday",
    time: "12:00 PM",
    label: "Midday hunt",
    title: "By lunchtime, curiosity is back.",
    description:
      "A fresh target changes the route through the house. Your dog follows the new trail from room to room, guided by scent alone.",
    image: "/images/day-sniffari/midday-home-map.png",
    alt: "A home floor plan showing a new midday scent trail",
    type: "hunt",
  },
  {
    id: "quiet",
    time: "3:30 PM",
    label: "Quiet time",
    title: "A second trail, then soft stillness.",
    description:
      "The afternoon hunt ends with one more reward. After the excitement, there is time to stretch, settle, and recharge for the evening.",
    image: "/images/day-sniffari/afternoon-relaxed.png",
    alt: "A dog relaxing during a quiet afternoon at home",
    type: "rest",
  },
  {
    id: "wind-down",
    time: "5:00 PM",
    label: "Wind down",
    title: "One final reward before welcome home.",
    description:
      "As the evening light softens, the nose pad gives one last treat. A calm finish to a day balanced with play, rest, and interesting scents.",
    image: "/images/day-sniffari/nose-touch.png",
    alt: "A dog gently pressing the Sniffari nose pad for its final reward",
    type: "hunt",
  },
] as const;

const skyByMoment = {
  departure: {
    top: "#fff3dc",
    bottom: "#dcebe7",
    sun: "12%",
    isDark: false,
    isEvening: false,
  },
  nap: {
    top: "#f7ead7",
    bottom: "#cddfdf",
    sun: "28%",
    isDark: false,
    isEvening: false,
  },
  midday: {
    top: "#d7e6e8",
    bottom: "#8fb7bd",
    sun: "47%",
    isDark: false,
    isEvening: false,
  },
  quiet: {
    top: "#6e858b",
    bottom: "#3e5963",
    sun: "66%",
    isDark: true,
    isEvening: false,
  },
  "wind-down": {
    top: "#9d5944",
    bottom: "#e4a36f",
    sun: "83%",
    isDark: true,
    isEvening: true,
  },
} as const;

export function DayWithSniffari() {
  const [activeId, setActiveId] = useState<(typeof moments)[number]["id"]>(
    moments[0].id,
  );
  const activeMoment = useMemo(
    () => moments.find((moment) => moment.id === activeId) ?? moments[0],
    [activeId],
  );
  const colors = skyByMoment[activeMoment.id];
  const isDark = colors.isDark;
  const isEvening = colors.isEvening;

  return (
    <section
      id="a-day-with-sniffari"
      className="relative scroll-mt-20 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: colors.bottom }}
    >
      <div className="relative flex items-center overflow-hidden py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(145deg, ${colors.top}, ${colors.bottom})`,
          }}
        />

        <div
          className="pointer-events-none absolute top-[12%] h-24 w-24 rounded-full bg-[#ffe1a3] opacity-80 blur-[1px] transition-all duration-700 sm:h-36 sm:w-36"
          style={{
            left: colors.sun,
            opacity: isEvening ? 0.12 : isDark ? 0.28 : 0.72,
            transform: "translate(-50%, 0)",
          }}
        />
        {isEvening ? (
          <div
            className="pointer-events-none absolute top-[13%] h-20 w-20 rounded-full bg-cream-50/80 shadow-[0_0_60px_rgba(255,255,255,0.35)] transition-all duration-700 sm:h-28 sm:w-28"
            style={{ left: colors.sun, transform: "translate(-50%, 0)" }}
          >
            <MoonStar className="absolute inset-0 m-auto h-7 w-7 text-teal-800/50 sm:h-9 sm:w-9" />
          </div>
        ) : (
          <SunMedium
            className="pointer-events-none absolute top-[12%] h-12 w-12 text-[#fff0ba] transition-all duration-700 sm:h-16 sm:w-16"
            style={{
              left: colors.sun,
              transform: "translate(-50%, 0)",
            }}
          />
        )}
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div
            className={`mx-auto max-w-3xl text-center transition-colors duration-700 ${
              isDark ? "text-cream-50" : "text-charcoal-900"
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.24em] transition-colors duration-700 ${
                isDark ? "text-teal-100" : "text-teal-700"
              }`}
            >
              A day with Sniffari
            </p>
            <h2 className="mt-4 text-[2.25rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Play, pause, play — a balanced day.
            </h2>
            <p
              className={`mx-auto mt-5 max-w-2xl text-sm leading-7 transition-colors duration-700 sm:text-base sm:leading-8 ${
                isDark ? "text-cream-50/75" : "text-charcoal-600"
              }`}
            >
              Follow one dog through nine hours at home. Short scent hunts fill
              the day with interest, while quiet pauses leave room for rest.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-5 gap-1 sm:hidden">
              {moments.map((moment) => {
                const selected = moment.id === activeId;
                const isHunt = moment.type === "hunt";
                return (
                  <button
                    key={moment.id}
                    type="button"
                    aria-label={`${moment.time}, ${moment.label}`}
                    aria-pressed={selected}
                    onClick={() => setActiveId(moment.id)}
                    className="group flex min-w-0 flex-col items-center px-0.5 text-center"
                  >
                    <span
                      className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        isHunt
                          ? "border-teal-600 bg-teal-500 shadow-[0_0_0_4px_rgba(22,155,155,0.13)]"
                          : `h-2 w-8 border-0 ${
                              isDark
                                ? "bg-cream-50/25"
                                : "bg-charcoal-900/15"
                            }`
                      } ${
                        selected
                          ? "scale-125 ring-2 ring-coral-500 ring-offset-2 ring-offset-transparent"
                          : "group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={`mt-3 font-display text-xs font-medium leading-tight transition-colors duration-300 sm:text-lg ${
                        isDark
                          ? selected
                            ? "text-cream-50"
                            : "text-cream-50/55"
                          : selected
                            ? "text-charcoal-900"
                            : "text-charcoal-400"
                      }`}
                    >
                      {moment.time.replace(" AM", "")}
                      <br />
                      {moment.time.includes("AM") ? "AM" : "PM"}
                    </span>
                    <span
                      className={`mt-1 line-clamp-2 text-[8px] font-bold uppercase leading-3 tracking-[0.08em] transition-colors duration-300 ${
                        isDark
                          ? selected
                            ? "text-teal-100"
                            : "text-cream-50/40"
                          : selected
                            ? "text-teal-700"
                            : "text-charcoal-400"
                      }`}
                    >
                      {moment.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative mx-auto hidden min-w-[700px] sm:block">
              <div
                className={`absolute left-[4%] right-[4%] top-[31px] h-px transition-colors duration-700 ${
                  isDark ? "bg-cream-50/25" : "bg-charcoal-900/15"
                }`}
              />
              <div className="absolute left-[4%] top-[29px] h-[5px] w-[8%] rounded-full bg-teal-500" />
              <div className="absolute left-[34%] top-[29px] h-[5px] w-[30%] rounded-full bg-teal-500" />
              <div className="absolute left-[71%] top-[29px] h-[5px] w-[12%] rounded-full bg-teal-500" />
              <div className="absolute left-[13%] top-[27px] h-2 w-[19%] rounded-full bg-charcoal-900/10" />
              <div className="absolute left-[66%] top-[27px] h-2 w-[3%] rounded-full bg-charcoal-900/10" />

              <div className="relative grid grid-cols-5">
                {moments.map((moment) => {
                  const selected = moment.id === activeId;
                  const isHunt = moment.type === "hunt";
                  return (
                    <button
                      key={moment.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveId(moment.id)}
                      onFocus={() => setActiveId(moment.id)}
                      className="group flex flex-col items-center px-2 text-center"
                    >
                      <span
                        className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isHunt
                            ? "border-teal-600 bg-teal-500 shadow-[0_0_0_5px_rgba(22,155,155,0.13)]"
                            : `h-2 w-12 border-0 ${
                                isDark
                                  ? "bg-cream-50/25"
                                  : "bg-charcoal-900/15"
                              }`
                        } ${
                          selected
                            ? "scale-125 ring-2 ring-coral-500 ring-offset-4 ring-offset-transparent"
                            : "group-hover:scale-110"
                        }`}
                      />
                      <span
                        className={`mt-5 font-display text-lg font-medium transition-colors duration-300 ${
                          isDark
                            ? selected
                              ? "text-cream-50"
                              : "text-cream-50/55"
                            : selected
                              ? "text-charcoal-900"
                              : "text-charcoal-400"
                        }`}
                      >
                        {moment.time}
                      </span>
                      <span
                        className={`mt-1 text-[9px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                          isDark
                            ? selected
                              ? "text-teal-100"
                              : "text-cream-50/40"
                            : selected
                              ? "text-teal-700"
                              : "text-charcoal-400"
                        }`}
                      >
                        {moment.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
              <div
                key={activeMoment.id}
                className="day-moment-card relative min-h-[240px] overflow-hidden rounded-[1.5rem] border border-white/25 bg-cream-50/90 shadow-card backdrop-blur-md sm:min-h-[340px] sm:rounded-[2rem]"
              >
                <Image
                  src={activeMoment.image}
                  alt={activeMoment.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-charcoal-900/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-cream-50 backdrop-blur-md">
                  {activeMoment.type === "hunt" ? "Scent hunt" : "Quiet pause"}
                </span>
              </div>

              <div
                key={`${activeMoment.id}-copy`}
                className="day-moment-card flex flex-col justify-center rounded-[1.5rem] border border-white/25 bg-cream-50/90 p-6 shadow-card backdrop-blur-md sm:rounded-[2rem] sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-display text-2xl italic text-teal-700/60 sm:text-3xl">
                    {activeMoment.time}
                  </span>
                  <span className="h-px w-8 bg-sand-300" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-700">
                    {activeMoment.label}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium leading-[1.08] tracking-[-0.03em] sm:mt-5 sm:text-4xl">
                  {activeMoment.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-charcoal-600">
                  {activeMoment.description}
                </p>
                <div className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeMoment.type === "hunt"
                        ? "bg-teal-500"
                        : "bg-charcoal-900/20"
                    }`}
                  />
                  {activeMoment.type === "hunt"
                    ? "Interesting scent activity"
                    : "Time to recharge"}
                </div>
              </div>
            </div>

            <div
              className={`mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors duration-700 sm:flex-row ${
                isDark
                  ? "border-cream-50/15 bg-charcoal-900/15 text-cream-50"
                  : "border-charcoal-900/10 bg-cream-50/55 text-charcoal-900"
              }`}
            >
              <div className="grid w-full grid-cols-2 gap-x-5 gap-y-2 text-center sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-7">
                <span className="font-display text-xl sm:text-2xl">9 hours</span>
                <span className="font-display text-xl sm:text-2xl">6 scent hunts</span>
                <span className="font-display text-xl sm:text-2xl">3 rooms</span>
                <span className="font-display text-xl italic sm:text-2xl">1 happy nose</span>
              </div>
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                  isDark ? "text-teal-100" : "text-teal-700"
                }`}
              >
                Plenty of rest. Plenty of interesting things to sniff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
