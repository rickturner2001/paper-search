import { type Dispatch, type SetStateAction, createContext } from "react";
import type { MenuSections } from "./types/misc";

interface SectionContextType {
  activeSection: MenuSections;
}

export const sectionContext = createContext<SectionContextType>({
  activeSection: "copy-free",
});
