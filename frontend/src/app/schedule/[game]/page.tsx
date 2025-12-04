import MainLogoArchon from "@/components/MainLogo";
import MOCK_SCHEDULE from "./games";
import ScheduleEntry from "@/components/schedule/ScheduleEntry";

interface SchedulePageProps {
  params: { game: string } | Promise<{ game: string }>;
}

export default async function SchedulePage({ params }: SchedulePageProps) {
  const { game } = await params;

  const MOCK_DATA = MOCK_SCHEDULE.find((item) => item.id === game);
  const entries = MOCK_DATA?.schedule ?? [];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050425] to-[#000000] flex flex-col items-center">

      <MainLogoArchon />

      <div className="text-white w-screen px-10 mb-10">
        <div className="bg-white/10 py-6 rounded-3xl shadow-[0_0_5px_rgb(255,255,255)]">
          <div className="text-white flex flex-col items-center drop-shadow-[0_0_1px_rgb(0,0,0)] gap-1 border-b border-white/30">
            <h1 className="text-3xl">Official Schedule</h1>
            <h2 className="text-2xl pb-2">{MOCK_DATA?.game}</h2>
          </div>

          <div className="flex flex-col gap-4 mt-6 px-6">
            {entries.length ? (
              entries.map((entry: any, i: number) => (
                <ScheduleEntry
                  key={
                    entry.id ??
                    `${entry.game}-${entry.date ?? "nodate"}-${
                      entry.time ?? "notime"
                    }-${i}`
                  }
                  game={entry.game}
                  teamA={entry.teamA}
                  teamB={entry.teamB}
                  date={entry.date}
                  time={entry.time}
                  location={entry.location}
                />
              ))
            ) : (
              <div className="text-center text-white/70 p-4">
                No schedule entries found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
