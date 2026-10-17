import { home } from "@/data/home";

/**
 * Editorial image with responsive WebP sources (1200w / 640w). Every AI image
 * carries a small visible caption so nothing reads as documentary evidence.
 */
export function Figure({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  ratio = "aspect-[16/10]",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const small = src.replace("-1200.webp", "-640.webp");
  return (
    <figure className={`relative overflow-hidden bg-muted ${ratio} ${className}`}>
      <img
        src={src}
        srcSet={`${small} 640w, ${src} 1200w`}
        sizes={sizes}
        alt={alt}
        width={1200}
        height={800}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
      <figcaption className="telemetry absolute bottom-2 right-2 bg-background/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur-sm md:text-[10px]">
        {home.imageCaption}
      </figcaption>
    </figure>
  );
}
