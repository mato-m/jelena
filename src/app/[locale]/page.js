import Index from "@/components/Index";
export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { locale } = params;
  const response = await fetch("http://localhost:3001/api/all", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return (
    <Index
      exhibitions={data.data.exhibitions}
      press={data.data.press}
      artworks={data.data.paintings}
      categories={data.data.categories}
    />
  );
}
