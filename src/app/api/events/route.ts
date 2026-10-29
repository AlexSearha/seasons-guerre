import { NextResponse } from "next/server";
import axios from "axios";
import * as XLSX from "xlsx";

// Définition de l'interface pour un événement
export interface EventItem {
  name: string;
  address: string;
  zipcode: string | number;
  city: string;
  date: string;
  time: string | number;
  link?: string;
  "image-link"?: string;
}

export async function GET() {
  const NEXTCLOUD_USER = process.env.NEXTCLOUD_USER;
  const NEXTCLOUD_APP_PASSWORD = process.env.NEXTCLOUD_APP_PASSWORD;
  const fileUrl = process.env.NEXTCLOUD_EXCEL_URL;

  if (!fileUrl || !NEXTCLOUD_USER || !NEXTCLOUD_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Variables d'environnement Nextcloud manquantes" },
      { status: 500 },
    );
  }

  try {
    // 1. Téléchargement du fichier depuis Nextcloud
    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
      auth: {
        username: NEXTCLOUD_USER,
        password: NEXTCLOUD_APP_PASSWORD,
      },
    });

    const buffer = Buffer.from(response.data);

    // 2. Lecture du classeur Excel
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // 3. Conversion en JSON typé
    const jsonData = XLSX.utils.sheet_to_json<EventItem>(worksheet);

    console.log("jsonData: ", jsonData);

    return NextResponse.json({ success: true, events: jsonData });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des événements Nextcloud:",
      error,
    );
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
