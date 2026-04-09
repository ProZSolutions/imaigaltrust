// import { guidelineContent } from "@/data/footerData";
import { guidelineContent } from "@/app/content/Footer";
export default function Footer() {
  return (
    <div className="flex flex-col gap-2">

      {guidelineContent.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className="text-gray-600 hover:text-green-700 text-xs"
        >
          {item.content}
        </a>
      ))}

    </div>
  );
}