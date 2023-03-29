

// @ts-nocheck
import  urgent from "@/assets/icons/Urgent.png"; 
import medium from "@/assets/icons/Medium.png";
import low from "@/assets/icons/Low.png";




export const getPrioIMG = (prio: string) => {
    switch (prio) {
      case "urgent":
        return urgent;
      case "medium":
        return medium;
      case "low":
        return low;
    }
  };