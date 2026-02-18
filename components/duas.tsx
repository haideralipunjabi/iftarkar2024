"use client";
import React, { useState } from "react";
import classNames from "classnames";

const Duas = [
  {
    title: "Dua Sahar",
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    english: "I intend to keep the fast for tomorrow in the month of Ramadan",
    roman: "Wa bisawmi ghadinn nawaiytu min shahri ramadan",
  },
  {
    title: "Dua Iftar - 1",
    arabic:
      "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امنْتُ وَعَليْكَ تَوَكّلتُ وَعَلى رِزْقِكَ اَفْطَرْتُ",
    english:
      "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
    roman:
      "Allahumma inni laka sumtu wa bika aamantu wa alayka tawakkaltu wa ala rizq-ika-aftartu",
  },
  {
    title: "Dua Iftar - 2",
    arabic:
      "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ ",
    english:
      "Thirst has gone, the arteries are moist, and the reward is sure, if Allah wills.",
    roman:
      "dhahabadh dhama-u wabtallatil 'urooqu, wa tha-batal ajru insha Allah",
  },
];

export function DuasContainer() {
  const [activeTab, setActiveTab] = useState(-1);
  return (
    <div className="w-full animate-fade-up-d2">
      {/* Tab row */}
      <div className="flex gap-2">
        {Duas.map((dua, idx) => (
          <button
            onClick={() => {
              setActiveTab(idx !== activeTab ? idx : -1);
            }}
            className={classNames(
              "flex-1 rounded-xl py-2.5 text-center text-[13px] font-semibold transition-all duration-300",
              {
                "bg-[#e8e2d8] text-ink-secondary hover:bg-[#ddd6c9] hover:text-ink":
                  activeTab !== idx,
                "bg-gradient-to-r from-[#0f4a2c] to-[#1a7a4e] text-white shadow-[0_2px_12px_rgba(15,74,44,0.25)]":
                  activeTab === idx,
              },
            )}
            key={idx}
          >
            {dua.title}
          </button>
        ))}
      </div>

      {/* Dua content */}
      {activeTab >= 0 && (
        <div className="card mt-3 animate-fade-up flex flex-col gap-y-4 p-5 sm:p-6">
          <p
            dir="rtl"
            className="text-3 font-arabic leading-[2] text-ink"
          >
            {Duas[activeTab].arabic}
          </p>
          <div className="divider" />
          <p className="text-sm italic text-ink-secondary sm:text-base">
            {Duas[activeTab].roman}
          </p>
          <div className="divider" />
          <p className="text-sm text-ink sm:text-base">
            {Duas[activeTab].english}
          </p>
        </div>
      )}
    </div>
  );
}
