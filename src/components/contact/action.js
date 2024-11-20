"use server";

export async function handleContactSubmission(formData) {
  const ime = formData.get("ime");
  const email = formData.get("email");
  const poruka = formData.get("poruka");

  if (!ime) throw new Error("Niste unijeli ime");
  if (!email) throw new Error("Niste unijeli email");
  if (!poruka) throw new Error("Niste unijeli poruku");

  try {
    const response = await fetch("https://jelenavusurovic.me/api/auth/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ime, email, poruka }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.data || "Greška pri slanju poruke");
    }

    return "Poruka poslata";
  } catch (error) {
    throw new Error(error.message || "Greška pri slanju poruke");
  }
}
