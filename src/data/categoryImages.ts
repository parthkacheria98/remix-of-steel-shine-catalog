import catStorage from "@/assets/cat-storage.jpg";
import catMilkpots from "@/assets/cat-milkpots.jpg";
import catTiffin from "@/assets/cat-tiffin.jpg";
import catCookware from "@/assets/cat-cookware.jpg";
import catTableware from "@/assets/cat-tableware.jpg";
import catBarni from "@/assets/cat-barni.jpg";
import catGifting from "@/assets/cat-gifting.jpg";

// Maps a derived category slug (last word of Item_Name, slugified) to a hero image.
const map: Record<string, string> = {
  dabba: catStorage,
  milkpot: catMilkpots,
  tiffin: catTiffin,
  cookware: catCookware,
  tableware: catTableware,
  barni: catBarni,
  gifting: catGifting,
};

export const imageForCategory = (slug: string) => map[slug] ?? catStorage;
export const imageForProduct = (categorySlug: string) => imageForCategory(categorySlug);
