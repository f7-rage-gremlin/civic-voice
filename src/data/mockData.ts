import { LawSubmission, VotableLaw, UserProfile, Comment } from "@/types";

const makeComment = (id: string, author: string, text: string, upvotes: number, downvotes: number, replies: Comment[] = []): Comment => ({
  id, author, text, upvotes, downvotes, userVote: null, replies, createdAt: "2h ago",
});

export const mockSubmissions: LawSubmission[] = [
  {
    id: "1",
    title: "Nationalise Rail Network",
    description: "The experiment of privatising national services has failed. Train prices across the country are more expensive than many international flights. Public ownership would reduce fares and improve service quality.",
    author: "JoeBlogs",
    upvotes: 679,
    downvotes: 80,
    userVote: null,
    bulletPoints: ["Cap fares at 2019 levels", "Merge franchises under public body", "Reinvest profits into infrastructure"],
    comments: [
      makeComment("c1", "TrainFan42", "Absolutely needed. My commute costs more than my lunch for a month.", 120, 5, [
        makeComment("c1r1", "FreeMarketGuy", "Competition drives quality. This would make it worse.", 15, 45),
        makeComment("c1r2", "TrainFan42", "What competition? Most routes have one operator.", 89, 3),
      ]),
      makeComment("c2", "PolicyWonk", "Look at how well it works in Germany and Japan.", 200, 12),
    ],
    createdAt: "5h ago",
  },
  {
    id: "2",
    title: "Legalise Euthanasia",
    description: "Allow terminally ill patients the right to die with dignity. Strict safeguards including multiple medical opinions and a cooling-off period.",
    author: "JoeBlogs",
    upvotes: 500,
    downvotes: 120,
    userVote: null,
    bulletPoints: ["Requires 2 independent medical opinions", "21-day cooling off period", "Only for terminal diagnoses"],
    comments: [
      makeComment("c3", "DocSmith", "As a physician, I support this with proper safeguards.", 340, 20),
    ],
    createdAt: "1d ago",
  },
  {
    id: "3",
    title: "UK Space Program",
    description: "Establish an independent UK space program to drive innovation, create high-tech jobs, and inspire the next generation.",
    author: "JoeBlogs",
    upvotes: 1100,
    downvotes: 200,
    userVote: null,
    comments: [
      makeComment("c4", "RocketNerd", "No one wants to leave the planet more than people in the UK", 450, 30),
    ],
    createdAt: "3d ago",
  },
  {
    id: "4",
    title: "Universal Basic Income Trial",
    description: "Run a 3-year pilot UBI program giving every adult £1,000/month to study the effects on employment, health, and social outcomes.",
    author: "EconProf",
    upvotes: 2300,
    downvotes: 890,
    userVote: null,
    bulletPoints: ["£1,000/month for all adults", "3-year trial period", "Independent academic review"],
    comments: [
      makeComment("c5", "TaxPayer99", "Who's paying for this?", 180, 90),
      makeComment("c6", "EconProf", "Studies from Finland show it increases entrepreneurship.", 420, 25),
    ],
    createdAt: "2d ago",
  },
  {
    id: "5",
    title: "Regulatory Antitrust Laws",
    description: "Break up monopolistic tech and energy companies that stifle competition and exploit consumers.",
    author: "FairPlay",
    upvotes: 1800,
    downvotes: 340,
    userVote: null,
    comments: [],
    createdAt: "4d ago",
  },
  {
    id: "6",
    title: "Fuel Price Cap",
    description: "Implement a hard cap on fuel prices to protect consumers from price gouging by energy companies during crises.",
    author: "DriverDave",
    upvotes: 3100,
    downvotes: 450,
    userVote: null,
    comments: [
      makeComment("c7", "EconWatcher", "Price caps can lead to shortages. Be careful.", 90, 60),
    ],
    createdAt: "6h ago",
  },
];

export const mockVotableLaws: VotableLaw[] = [
  {
    id: "v1",
    title: "Revoke Hate Speech Laws",
    description: "Repeal current hate speech legislation in favour of broader free speech protections, while maintaining laws against direct incitement to violence.",
    bulletPoints: ["Repeal Section 127", "Maintain incitement laws", "Strengthen libel protections"],
    vote: null,
    comments: [makeComment("vc1", "FreeSpeechNow", "Essential for democracy.", 230, 80)],
  },
  {
    id: "v2",
    title: "Restructure NHS",
    description: "The NHS has been defunded since the 1980s to promote privatisation. Let's reverse this trend with structural reform.",
    bulletPoints: ["Cut administrative positions", "Fund more doctors, nurses + hospitals", "Re-nationalise NHS dataset", "No more crony contracts", "All contracts under independent review + audit"],
    vote: null,
    comments: [
      makeComment("vc2", "NHSWorker", "We desperately need this.", 5100, 120, [
        makeComment("vc2r1", "FreeMarketGood", "Freemarket good tweet blah-", 12, 340),
      ]),
    ],
  },
  {
    id: "v3",
    title: "Publicly Owned Water",
    description: "Bring water companies back into public ownership to end sewage dumping and reduce bills.",
    bulletPoints: ["End dividend payments to shareholders", "Invest in infrastructure", "Stop sewage dumping"],
    vote: null,
    comments: [],
  },
  {
    id: "v4",
    title: "Defund Royal Family",
    description: "Remove the sovereign grant and have the royal family fund themselves from their private estates.",
    bulletPoints: ["Remove sovereign grant", "Open Crown Estate to public trust", "Maintain ceremonial role only"],
    vote: null,
    comments: [makeComment("vc3", "Monarchist", "Tourism revenue alone justifies the cost.", 150, 280)],
  },
  {
    id: "v5",
    title: "Politicians Pay Capped at Median Wage",
    description: "Cap MP salaries at the national median wage so they have a direct incentive to raise living standards for everyone.",
    bulletPoints: ["Salary tied to median wage", "No second jobs", "Transparent expenses"],
    vote: null,
    comments: [],
  },
];

export const mockUsers: UserProfile[] = [
  {
    id: "u1", name: "Ian Hislop", handle: "ianhislop", isPublic: true, isFollowing: true, isActive: true, weight: 1.0,
    posts: [mockSubmissions[0]], commentHistory: [], votingHistory: [{ lawTitle: "Restructure NHS", vote: "yes" }, { lawTitle: "Defund Royal Family", vote: "yes" }],
  },
  {
    id: "u2", name: "Jeremy Corbyn", handle: "jeremycorbyn", isPublic: true, isFollowing: true, isActive: true, weight: 0.8,
    posts: [], commentHistory: [], votingHistory: [{ lawTitle: "Publicly Owned Water", vote: "yes" }, { lawTitle: "Politicians Pay Capped at Median Wage", vote: "yes" }],
  },
  {
    id: "u3", name: "Joe Blogs", handle: "joeblogs", isPublic: true, isFollowing: false, isActive: false, weight: 0.5,
    posts: mockSubmissions.slice(0, 3), commentHistory: [mockSubmissions[0].comments[0]], votingHistory: [{ lawTitle: "Restructure NHS", vote: "yes" }, { lawTitle: "Revoke Hate Speech Laws", vote: "no" }],
  },
  {
    id: "u4", name: "King Charles", handle: "kingcharles", isPublic: true, isFollowing: false, isActive: false, weight: 0,
    posts: [], commentHistory: [], votingHistory: [],
  },
  {
    id: "u5", name: "Hannah Fry", handle: "hannahfry", isPublic: true, isFollowing: false, isActive: false, weight: 0.5,
    posts: [], commentHistory: [], votingHistory: [{ lawTitle: "Restructure NHS", vote: "yes" }],
  },
  {
    id: "u6", name: "Fern Cotton", handle: "ferncotton", isPublic: true, isFollowing: true, isActive: true, weight: 1.0,
    posts: [], commentHistory: [], votingHistory: [],
  },
  {
    id: "u7", name: "Andy Burnham", handle: "andyburnham", isPublic: true, isFollowing: false, isActive: false, weight: 0,
    posts: [], commentHistory: [], votingHistory: [{ lawTitle: "Revoke Hate Speech Laws", vote: "yes" }],
  },
  {
    id: "u8", name: "Gary Stevenson", handle: "garystevenson", isPublic: true, isFollowing: true, isActive: true, weight: 1.0,
    posts: [], commentHistory: [], votingHistory: [],
  },
  {
    id: "u9", name: "Joanna Lumley", handle: "joannalumley", isPublic: true, isFollowing: false, isActive: false, weight: 0.5,
    posts: [], commentHistory: [], votingHistory: [],
  },
];
