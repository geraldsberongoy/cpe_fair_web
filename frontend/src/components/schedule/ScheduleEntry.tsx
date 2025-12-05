import FontaineBG from "@/assets/images/backgrounds/fontaine.jpg";
import InazumaBG from "@/assets/images/backgrounds/inazuma.jpg";
import LiyueBG from "@/assets/images/backgrounds/liyue.jpg";
import MondstadtBG from "@/assets/images/backgrounds/mondstadt.jpg";
import NatlanBG from "@/assets/images/backgrounds/natlan.jpg";
import SumeruBG from "@/assets/images/backgrounds/sumeru.jpg";
import SnezhnayaBG from "@/assets/images/backgrounds/snezhnaya.jpg";

type Props = {
  game?: string;
  teamA?: string | null;
  teamB?: string | null;
  date?: string | null;
  time?: string | null;
  location?: string | null;
};

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};


const BG_MAP: Record<string, string> = {
  fontaine: FontaineBG.src,
  inazuma: InazumaBG.src,
  liyue: LiyueBG.src,
  mondstadt: MondstadtBG.src,
  natlan: NatlanBG.src,
  sumeru: SumeruBG.src,
  snezhnaya: SnezhnayaBG.src,
};


const pickBg = (name?: string | null) => {
  if (!name) return undefined;
  const key = name.toLowerCase();
  for (const k of Object.keys(BG_MAP)) {
    if (key.includes(k)) return BG_MAP[k];
  }
  return undefined;
};

const ScheduleEntry = ({ game, teamA, teamB, date, time, location }: Props) => {
  const formattedDate = formatDate(date);
  const bgA = pickBg(teamA);
  const bgB = pickBg(teamB);

  const leftClip = "polygon(0 0, 60% 0, 40% 100%, 0 100%)";
  const rightClip = "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)";

  return (
    <article className="relative w-full h-auto py-4 sm:h-32 rounded-lg overflow-hidden border border-white/60">
      {/* background halves */}
      <div className="absolute inset-0" aria-hidden>
        {bgA && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: leftClip,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bgA})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {bgB && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: rightClip,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bgB})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* subtle divider line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 39%, rgba(255,255,255,0.06) 41%, rgba(255,255,255,0.06) 59%, rgba(255,255,255,0) 61%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* content: stacked on small screens, horizontal on sm+ */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center h-full px-3 sm:px-6 gap-2 sm:gap-0">
        <div className="w-full sm:flex-1 text-center sm:text-left text-white drop-shadow-sm">
          <div className="text-[10px] sm:text-xs uppercase text-white/80">Team</div>
          <div className="font-semibold text-sm sm:text-lg md:text-xl lg:text-2xl truncate">
            {teamA ?? "TBD"}
          </div>
        </div>

        {/* center VS + meta */}
        <div className="flex-none text-center mx-0 sm:mx-4">
          <div className="font-bold text-white text-sm sm:text-lg md:text-xl">VS</div>
          <div className="text-[10px] sm:text-xs md:text-sm text-white/90 mt-1">
            {formattedDate ?? "TBD"}{formattedDate || time ? " • " : ""}{time ?? "TBD"}
          </div>
          <div className="text-[9px] sm:text-xs text-white/80 mt-1 truncate">{location ?? ""}</div>
        </div>

        <div className="w-full sm:flex-1 text-center sm:text-right text-white drop-shadow-sm">
          <div className="text-[10px] sm:text-xs uppercase text-white/80">Team</div>
          <div className="font-semibold text-sm sm:text-lg md:text-xl lg:text-2xl truncate">
            {teamB ?? "TBD"}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ScheduleEntry;