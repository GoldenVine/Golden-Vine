import { useGetInstagramFeed } from "@workspace/api-client-react";
import { SiInstagram } from "react-icons/si";
import { FadeIn } from "@/components/FadeIn";

export function InstagramFeed() {
  const { data, isLoading, isError } = useGetInstagramFeed({
    query: { retry: false, queryKey: ["instagram-feed"] },
  });

  if (isLoading || isError || !data || data.items.length === 0) {
    return null;
  }

  return (
    <FadeIn>
      <section className="section-cream max-w-5xl mx-auto py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <SiInstagram className="w-6 h-6" />
          <a
            href="https://www.instagram.com/goldenvinepiercing"
            target="_blank"
            rel="noreferrer"
            className="text-2xl font-bold font-serif no-underline hover:opacity-80 transition-opacity"
          >
            @goldenvinepiercing
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {data.items.slice(0, 6).map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noreferrer"
              className="block aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={item.mediaType === "VIDEO" ? item.thumbnailUrl ?? item.mediaUrl : item.mediaUrl}
                alt={item.caption ?? "Instagram post"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
