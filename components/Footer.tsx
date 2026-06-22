import Image from "next/image";

const usaAddress = [
  "Two Lions International Corporation",
  "16192 Coastal Highway",
  "Lewes, DE 19958 USA",
  "File Number 10426498",
  "(EIN) 37-2212324",
];

const italyAddress = [
  "Two Lions Intl. Corp. Italy",
  "Via Goffredo Mameli 96",
  "Interno 14 Floor 7",
  "Cagliari 09123",
];

export default function Footer() {
  return (
      <footer className="bg-linear-to-b from-[color:var(--color-secondary)] to-secondaty/50 text-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:px-8 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
          <div className="md:flex md:flex-col md:justify-center md:text-left">
            <div className="flex flex-col gap-1 text-center text-sm leading-6 md:text-base md:leading-7 md:max-w-[260px]">
              {usaAddress.map((line) => (
                <span key={line} className="text-primary/90">{line}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/SectionsBackgrounds/twoLions_logo.png"
              alt="Two Lions"
              width={160}
              height={160}
              className="h-16 w-auto object-contain md:h-20 lg:h-24"
            />
          </div>

          <div className="md:flex md:flex-col md:justify-center md:text-left">
            <div className="flex flex-col gap-1 text-center text-sm leading-6 md:text-base md:leading-7 md:max-w-[260px]">
              {italyAddress.map((line) => (
                <span key={line} className="text-primary/90">{line}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
