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
      "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ ",
    english:
      "Thirst has gone, the arteries are moist, and the reward is sure, if Allah wills.",
    roman:
      "dhahabadh dhama-u wabtallatil ‘urooqu, wa tha-batal ajru insha Allah",
  },
];

export function DuasContainer() {
  const [activeTab, setActiveTab] = useState(-1);
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between ">
        {Duas.map((dua, idx) => (
          <button
            onClick={() => {
              if (idx !== activeTab) {
                setActiveTab(idx);
              } else {
                setActiveTab(-1);
              }
            }}
            className={classNames(
              "text-2 w-full bg-black/20 py-4 text-center text-white shadow",
              {
                " bg-secondary/50": activeTab === idx,
                "rounded-l-full": idx == 0,
                "rounded-r-full": idx == Duas.length - 1,
              },
            )}
            key={idx}
          >
            {dua.title}
          </button>
        ))}
      </div>
      {activeTab >= 0 && (
        <div className="text-3 mt-8 flex flex-col gap-y-4 text-white">
          <p dir="rtl" className="font-amiri leading-loose">
            {Duas[activeTab].arabic}
          </p>
          <hr />
          <i>{Duas[activeTab].roman}</i>
          <hr />
          <p>{Duas[activeTab].english}</p>
        </div>
      )}
    </div>
  );
}
