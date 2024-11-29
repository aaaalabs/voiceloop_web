import { IconCheckbox, IconChartBar, IconUsers } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import icon_analytics from "@p/icons/icon_analytics.png";
import icon_engage from "@p/icons/icon_engage.png";

// Import new icons
import icon_MatchMaker_light from "@p/icons_v2/MatchMaker_light.svg";
import icon_MatchMaker_dark from "@p/icons_v2/MatchMaker_dark.svg";
import icon_GlobalGrid_light from "@p/icons_v2/GlobalGrid_light.svg";
import icon_GlobalGrid_dark from "@p/icons_v2/GlobalGrid_dark.svg";
import icon_ConnectionCatalyst_light from "@p/icons_v2/ConnectionCatalyst_light.svg";
import icon_ConnectionCatalyst_dark from "@p/icons_v2/ConnectionCatalyst_dark.svg";
import icon_SpotlightLauncher_light from "@p/icons_v2/SpotlightLauncher_light.svg";
import icon_SpotlightLauncher_dark from "@p/icons_v2/SpotlightLauncher_dark.svg";
import icon_EchoAmplifier_light from "@p/icons_v2/EchoAmplifier_light.svg";
import icon_EchoAmplifier_dark from "@p/icons_v2/EchoAmplifier_dark.svg";
import icon_RetentionRocket_light from "@p/icons_v2/RetentionRocket_light.svg";
import icon_RetentionRocket_dark from "@p/icons_v2/RetentionRocket_dark.svg";
import icon_TalentTracker_light from "@p/icons_v2/TalentTracker_light.svg";
import icon_TalentTracker_dark from "@p/icons_v2/TalentTracker_dark.svg";
import icon_MemberRadar_light from "@p/icons_v2/MemberRadar_light.svg";
import icon_MemberRadar_dark from "@p/icons_v2/MemberRadar_dark.svg";

const features = [
  {
    title: "MatchMaker",
    description: "Your 24/7 Networking Supercomputer: AI-powered matchmaking based on 50+ data points",
    iconLight: icon_MatchMaker_light,
    iconDark: icon_MatchMaker_dark,
  },
  {
    title: "GlobalGrid",
    description: "Your Community's Living, Breathing World Map: Daily-updated global visualization of community members",
    iconLight: icon_GlobalGrid_light,
    iconDark: icon_GlobalGrid_dark,
  },
  {
    title: "ConnectionCatalyst",
    description: "20-Minute Calls, Lifetime Connections: Host-facilitated networking calls",
    iconLight: icon_ConnectionCatalyst_light,
    iconDark: icon_ConnectionCatalyst_dark,
  },
  {
    title: "SpotlightLauncher",
    description: "LinkedIn Reputation Booster: Automated LinkedIn spotlight posts for new members",
    iconLight: icon_SpotlightLauncher_light,
    iconDark: icon_SpotlightLauncher_dark,
  },
  {
    title: "EchoAmplifier",
    description: "Your Community Podcast Launchpad: Option to join and share stories on the community podcast",
    iconLight: icon_EchoAmplifier_light,
    iconDark: icon_EchoAmplifier_dark,
  },
  {
    title: "RetentionRocket",
    description: "Engagement Metrics That Soar: Analytics dashboard for community owners to track growth",
    iconLight: icon_RetentionRocket_light,
    iconDark: icon_RetentionRocket_dark,
  },
  {
    title: "TalentTracker",
    description: "Your Opportunity Compass: Discover perfect collaborators and partners already in your network",
    iconLight: icon_TalentTracker_light,
    iconDark: icon_TalentTracker_dark,
  },
  {
    title: "MemberRadar",
    description: "Early Warning System: 2-click surveys that catch member needs before they become issues",
    iconLight: icon_MemberRadar_light,
    iconDark: icon_MemberRadar_dark,
  }
];

export { features };