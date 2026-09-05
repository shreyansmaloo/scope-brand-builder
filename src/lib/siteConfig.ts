// Central place for links the client will hand over separately (e.g. via Google Drive)
// so they can be swapped in one spot once the real asset is ready.
//
// This points at a single Drive FILE. To update the catalogue later without touching
// this code, do NOT delete and re-upload — that creates a new file ID and breaks this
// link. Instead, in Drive: right-click the file → "Manage versions" → "Upload new
// version" (keeps the same ID/URL, just serves the newer PDF). Sharing must stay set
// to "Anyone with the link" so visitors aren't blocked by a login wall.
export const PRODUCT_CATALOGUE_PDF_URL = "https://drive.google.com/file/d/1BTsUN8sVFAyqupp8O2JDe6uDG9AzC-uz/view?usp=sharing";
