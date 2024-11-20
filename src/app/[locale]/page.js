import Index from "@/components/Index";

export default async function Page() {
  const response = await fetch("https://jelenavusurovic.me/api/all");

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
