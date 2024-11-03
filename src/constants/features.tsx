import { IconCheckbox, IconChartBar, IconUsers } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import icon_analytics from "@p/icons/icon_analytics.png";
import icon_ConAIlight from "@p/icons/ConAI_light.svg";
import icon_ConAIdark from "@p/icons/ConAI_dark.svg";
import icon_SpotLlight from "@p/icons/SpotL_light.svg";
import icon_SpotLdark from "@p/icons/SpotL_dark.svg";
import icon_HumTCatlight from "@p/icons/HumTCat_light.svg";
import icon_HumTCatdark from "@p/icons/HumTCat_dark.svg";
import icon_EcAmplight from "@p/icons/EcAmp_light.svg";
import icon_EcAmpdark from "@p/icons/EcAmp_dark.svg";
import icon_RetRoclight from "@p/icons/RetRoc_light.svg";
import icon_RetRocdark from "@p/icons/RetRoc_dark.svg";
import icon_GeoNPlight from "@p/icons/GeoNP_light.svg";
import icon_GeoNPdark from "@p/icons/GeoNP_dark.svg";
import icon_engage from "@p/icons/icon_engage.png";


const features = [
  {
    title: "MatchMaker AI",
    description: "Your 24/7 Networking Supercomputer: AI-powered matchmaking based on 50+ data points",
    iconLight: icon_ConAIlight,
    iconDark: icon_ConAIdark,
  },
  {
    title: "GeoNet Pulse",
    description: "Your Community's Living, Breathing World Map: Daily-updated global visualization of community members",
    iconLight: icon_GeoNPlight,
    iconDark: icon_GeoNPdark,
  },
  {
    title: "Human-Touch Catalyst",
    description: "20-Minute Calls, Lifetime Connections: Host-facilitated networking calls",
    iconLight: icon_HumTCatlight,
    iconDark: icon_HumTCatdark,
  },
  {
    title: "Spotlight Launcher",
    description: "LinkedIn Reputation Booster: Automated LinkedIn spotlight posts for new members",
    iconLight: icon_SpotLlight,
    iconDark: icon_SpotLdark,
  },
  {
    title: "Echo Amplifier",
    description: "Your Community Podcast Launchpad: Option to join and share stories on the community podcast",
    iconLight: icon_EcAmplight,
    iconDark: icon_EcAmpdark,
  },
  {
    title: "Retention Rocket",
    description: "Engagement Metrics That Soar: Analytics dashboard for community owners to track growth",
    iconLight: icon_RetRoclight,
    iconDark: icon_RetRocdark,  }
];

export { features };
