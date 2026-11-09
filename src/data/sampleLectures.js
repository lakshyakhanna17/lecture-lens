export const SAMPLE_LECTURES = [
  {
    id: "lec-cs301",
    code: "CS 301",
    title: "Distributed Systems: Consensus & The Raft Protocol",
    professor: "Prof. Elena Rostova",
    department: "Computer Science & Engineering",
    duration: "48:15",
    durationSeconds: 2895,
    recordedDate: "Oct 24, 2026",
    summary: {
      synopsis:
        "This lecture provides an in-depth dissection of the consensus problem in asynchronous distributed systems. Prof. Rostova introduces the Raft consensus algorithm as an understandable alternative to Paxos, breaking down its three subproblems: Leader Election, Log Replication, and Safety guarantees. Key emphasis is placed on preventing split-brain states via majority quorums and randomized election timeouts.",
      keyTakeaways: [
        {
          badge: "Core Concept",
          badgeColor: "indigo",
          title: "The Consensus Requirement",
          desc: "All non-faulty nodes in an asynchronous network must agree on an identical state machine log sequence despite packet loss, delays, and node crashes."
        },
        {
          badge: "Protocol Mechanics",
          badgeColor: "blue",
          title: "Leader-Driven Architecture",
          desc: "Raft decomposes consensus into explicit leadership: at any time, a node is in Leader, Follower, or Candidate state. Only the Leader accepts client commands."
        },
        {
          badge: "Safety Guarantee",
          badgeColor: "amber",
          title: "Election Safety & Quorum Majority",
          desc: "At most one leader can be elected per term (term numbers act as logical clocks). A candidate must gather votes from a strict majority (n/2 + 1) of cluster nodes."
        },
        {
          badge: "Critical Invariant",
          badgeColor: "emerald",
          title: "Log Matching Property",
          desc: "If two logs contain an entry with the same index and term, they store identical commands and all preceding entries match."
        }
      ],
      examAlerts: [
        "MIDTERM ALERT: Prof. Rostova stated that tracing a 5-node cluster partition and explaining why a partitioned minority leader cannot commit client writes WILL be Question 2 on the midterm.",
        "Definition nuance: Don't confuse 'Split-Brain' with network partition. A network partition causes split-brain ONLY if the protocol lacks majority quorum enforcement.",
        "Term comparison: Remember why randomized election timeouts (150ms-300ms) prevent split-vote deadlocks."
      ],
      keyConcepts: [
        {
          term: "Consensus",
          definition: "A fundamental distributed computing problem where multiple nodes agree on a single data value or sequence of state machine transitions."
        },
        {
          term: "Term Number",
          definition: "Logical clocks used in Raft to detect obsolete leaders and stale candidates; increments monotonically with each election cycle."
        },
        {
          term: "Heartbeat (AppendEntries RPC)",
          definition: "Empty AppendEntries RPCs sent periodically by the leader to followers to maintain authority and reset election timers."
        },
        {
          term: "Quorum",
          definition: "The minimum number of members (strictly > 50% or ⌊n/2⌋ + 1) required to conduct an election or commit a log entry safely."
        },
        {
          term: "Log Compaction (Snapshotting)",
          definition: "Discarding obsolete log entries once applied to state machine memory to prevent unbounded storage growth."
        }
      ],
      actionItems: [
        { task: "Complete Lab 2 (Raft Leader Election in Go)", due: "Friday 11:59 PM", status: "High Priority" },
        { task: "Read Ongaro & Ousterhout Raft Paper Sections 5.1–5.4", due: "Next Monday", status: "Reading" },
        { task: "Attempt practice problem set on 3-way partition scenario", due: "Before Midterm Review", status: "Recommended" }
      ]
    },
    transcript: [
      {
        id: "t1",
        time: "00:00",
        seconds: 0,
        speaker: "Prof. Elena Rostova",
        text: "Good morning everyone. Welcome back to CS 301. Today we are tackling one of the most intellectually rewarding topics in computer systems: Distributed Consensus.",
        topic: "Introduction"
      },
      {
        id: "t2",
        time: "01:20",
        seconds: 80,
        speaker: "Prof. Elena Rostova",
        text: "Imagine you are running a financial ledger across five servers spread across North America and Europe. If server number three crashes, or fiber cables between New York and London get severed, how do the remaining servers guarantee that an account balance isn't modified twice?",
        topic: "Introduction"
      },
      {
        id: "t3",
        time: "03:45",
        seconds: 225,
        speaker: "Student (Maya)",
        text: "Professor, couldn't we just have one primary server and four backup servers that replicate everything the primary says?",
        topic: "Primary-Backup Limitations"
      },
      {
        id: "t4",
        time: "04:15",
        seconds: 255,
        speaker: "Prof. Elena Rostova",
        text: "Maya, that is exactly what people tried in the 1980s. But what happens if the network between primary and backup fails, but both machines are healthy? The backups think the primary is dead and elect a new primary. Now you have two masters writing contradictory transactions! That catastrophic failure mode is called Split-Brain.",
        topic: "Split-Brain Problem"
      },
      {
        id: "t5",
        time: "07:30",
        seconds: 450,
        speaker: "Prof. Elena Rostova",
        text: "For decades, Leslie Lamport's Paxos algorithm was the gold standard. However, Paxos is notoriously difficult to understand and implement in real software. That is why in 2014, Diego Ongaro and John Ousterhout at Stanford designed Raft.",
        topic: "The Raft Protocol"
      },
      {
        id: "t6",
        time: "10:10",
        seconds: 610,
        speaker: "Prof. Elena Rostova",
        text: "Raft structures consensus into three independent subproblems: Leader Election, Log Replication, and Safety. Let's inspect the node state machine: every server is either a Leader, a Follower, or a Candidate.",
        topic: "Raft Node States"
      },
      {
        id: "t7",
        time: "13:40",
        seconds: 820,
        speaker: "Prof. Elena Rostova",
        text: "Notice that all normal operations are strictly unidirectional. Clients never send writes to followers; if a follower receives a write, it redirects the client to the known leader. Only the leader appends entries to its log and replicates them.",
        topic: "Log Replication"
      },
      {
        id: "t8",
        time: "18:25",
        seconds: 1105,
        speaker: "TA Michael",
        text: "Make sure you note down the election timeout randomization! If every follower had a static 150 millisecond timer, what happens when the leader dies?",
        topic: "Election Timeouts"
      },
      {
        id: "t9",
        time: "19:05",
        seconds: 1145,
        speaker: "Prof. Elena Rostova",
        text: "Thank you Michael. Exactly right! If all timers expire simultaneously, every single follower becomes a candidate at the exact same millisecond. Each votes for itself, nobody gets a majority, and the vote splits indefinitely. Randomizing timeouts between 150ms and 300ms breaks this symmetry cleanly.",
        topic: "Election Timeouts"
      },
      {
        id: "t10",
        time: "24:50",
        seconds: 1490,
        speaker: "Prof. Elena Rostova",
        text: "Now mark this down in red ink for your midterm exam: The Quorum Rule. In a cluster of N nodes, any committed state transition must be acknowledged by at least floor(N/2) + 1 servers. In a 5-node cluster, that quorum is 3.",
        topic: "Quorum & Commit Rule"
      },
      {
        id: "t11",
        time: "32:15",
        seconds: 1935,
        speaker: "Prof. Elena Rostova",
        text: "Why is floor(N/2) + 1 mathematically bulletproof? Because any two majorities of N nodes must overlap by at least one common server! That overlapping server will contain the latest log entry and deny any candidate with an outdated log.",
        topic: "Majority Overlap Theorem"
      },
      {
        id: "t12",
        time: "42:00",
        seconds: 2520,
        speaker: "Prof. Elena Rostova",
        text: "To wrap up: consensus is about building resilience on top of unreliable foundations. On Thursday we will code the AppendEntries RPC protocol handlers in Go. Please read section 5.2 of the Raft paper beforehand.",
        topic: "Conclusion & Lab Prep"
      }
    ],
    revision: {
      flashcards: [
        {
          id: "fc1",
          topic: "Node States",
          front: "What are the three operational states a Raft node can occupy?",
          back: "1. Follower (passive, responds to RPCs)\n2. Candidate (seeking votes during an election)\n3. Leader (handles client requests & log replication)",
          hint: "Think about the lifecycle from startup to handling client traffic.",
          difficulty: "Easy"
        },
        {
          id: "fc2",
          topic: "Fault Tolerance",
          front: "What is 'Split-Brain' and how does Raft prevent it?",
          back: "Split-brain occurs when a network partition creates multiple isolated leaders that each accept conflicting writes. Raft prevents this by requiring a strict majority quorum (n/2 + 1) for any leader election and log commit.",
          hint: "Requires overlap theorem between any two majorities.",
          difficulty: "Medium"
        },
        {
          id: "fc3",
          topic: "Election Timers",
          front: "Why are election timeouts randomized (e.g., 150ms – 300ms) in Raft?",
          back: "To prevent 'split votes'. If all nodes had identical timers, they would become candidates simultaneously, split the vote equally, and repeat elections endlessly.",
          hint: "Symmetry breaking mechanism.",
          difficulty: "Medium"
        },
        {
          id: "fc4",
          topic: "Commit Invariant",
          front: "When is a log entry considered officially 'committed' in Raft?",
          back: "When the current term leader has successfully replicated it on a majority (⌊n/2⌋ + 1) of cluster nodes. Once committed, it will never be overwritten.",
          hint: "Involves leader term and cluster quorum.",
          difficulty: "Hard"
        },
        {
          id: "fc5",
          topic: "Quorum Math",
          front: "In a 7-node distributed cluster, what is the minimum quorum size and how many node failures can be tolerated?",
          back: "Quorum size = ⌊7/2⌋ + 1 = 4 nodes.\nMax tolerable failures = 3 nodes (since 7 - 3 = 4 nodes remaining).",
          hint: "Formula: F = ⌊(N - 1) / 2⌋",
          difficulty: "Hard"
        }
      ],
      chapters: [
        {
          title: "1. The Consensus Dilemma & Split-Brain Risks",
          timestamp: "00:00 - 09:30",
          summary: "Introduction to distributed state machines, failure modes in asynchronous networks, and the fatal flaws of naive primary-backup replication.",
          keyPoints: [
            "Asynchronous networks can drop, delay, or duplicate packets.",
            "Naive primary backup fails when network partitions isolate the leader.",
            "Split-brain results in data divergence and irrecoverable state corruption."
          ]
        },
        {
          title: "2. The Raft State Machine: Follower, Candidate, Leader",
          timestamp: "09:30 - 24:00",
          summary: "Deconstruction of Raft roles, RPC message types (RequestVote, AppendEntries), and heartbeat mechanics.",
          keyPoints: [
            "Followers transition to Candidate after election timeout.",
            "AppendEntries RPC acts as both heartbeat and log payload transport.",
            "Randomized election intervals (150-300ms) prevent simultaneous candidate deadlocks."
          ]
        },
        {
          title: "3. Quorum Math, Log Replication & Safety Invariants",
          timestamp: "24:00 - 48:15",
          summary: "Mathematical proof of majority overlap, commit guarantees, and handling asymmetric network partitions.",
          keyPoints: [
            "Any two majorities of size (N/2 + 1) intersect at least at one node.",
            "Candidates must have logs at least as up-to-date as voters to win an election.",
            "A partitioned minority leader cannot commit client entries."
          ]
        }
      ],
      quiz: [
        {
          question: "What primary mechanism prevents split-vote deadlocks during Raft leader elections?",
          options: [
            "Static priority assigned to lowest node ID",
            "Randomized election timeout durations (150ms-300ms)",
            "Manual human administrator failover",
            "Broadcasting UDP packets with high TTL"
          ],
          correctIndex: 1,
          explanation: "Randomizing election timeouts breaks symmetry between followers, ensuring one candidate's timer expires first and claims majority votes before rivals awaken."
        },
        {
          question: "How many node failures can a 5-node Raft cluster tolerate while remaining operational?",
          options: ["1 node", "2 nodes", "3 nodes", "4 nodes"],
          correctIndex: 1,
          explanation: "For N=5, quorum requires ⌊5/2⌋ + 1 = 3 nodes. Therefore, at most 2 nodes can fail (5 - 2 = 3)."
        },
        {
          question: "What happens if a follower receives a write request directly from a client?",
          options: [
            "It drops the packet silently",
            "It writes to its local disk and sends a heartbeat",
            "It redirects the client to the current leader",
            "It immediately triggers a leader election"
          ],
          correctIndex: 2,
          explanation: "In Raft, client writes must flow strictly through the leader. Followers redirect client requests to the known leader address."
        },
        {
          question: "Why must any two majorities of cluster nodes share at least one node in common?",
          options: [
            "By Pigeonhole Principle: 2 * (N/2 + 0.5) = N + 1 > N",
            "Because Raft uses a centralized coordinator",
            "Because network cables always form a tree topology",
            "Because nodes are assigned identical IP subnets"
          ],
          correctIndex: 0,
          explanation: "Since each majority contains strictly more than half the nodes, their cardinalities sum to more than the total cluster size, forcing at least one common intersecting node."
        }
      ],
      cheatSheet: `### CS 301 Quick Revision Cheat Sheet
* **Goal of Consensus**: Agreement on state machine command sequences across unreliable networks.
* **Raft Triple**: Leader Election + Log Replication + Safety.
* **Three States**: Follower ➔ Candidate ➔ Leader.
* **Quorum Formula**: Quorum = ⌊N/2⌋ + 1. Tolerable failures F = ⌊(N-1)/2⌋.
* **Heartbeats**: Sent via empty \`AppendEntries\` RPC.
* **Election Timeout**: Random between 150ms–300ms.
* **Midterm Trap**: Minority partitions can accept writes into local logs, BUT they CANNOT commit them without majority quorum.`
    }
  },
  {
    id: "lec-bio204",
    code: "BIO 204",
    title: "Cellular Respiration: The Krebs Cycle & ATP Synthase",
    professor: "Dr. Marcus Vance",
    department: "Department of Biochemistry",
    duration: "52:40",
    durationSeconds: 3160,
    recordedDate: "Oct 28, 2026",
    summary: {
      synopsis:
        "A rigorous biochemical walk-through of aerobic respiration, connecting cytosolic glycolysis to the mitochondrial matrix and the inner mitochondrial membrane. Dr. Vance illustrates the thermodynamic efficiency of the Electron Transport Chain (ETC), chemiosmosis driven by the proton motive force, and the rotary motor mechanism of the F1F0 ATP synthase complex.",
      keyTakeaways: [
        {
          badge: "Metabolic Pathway",
          badgeColor: "emerald",
          title: "Net Yield of Glycolysis & Pyruvate Oxidation",
          desc: "Glucose oxidation yields 2 pyruvate, 2 net ATP, and 2 NADH. Pyruvate translocates into mitochondria, yielding Acetyl-CoA and CO2."
        },
        {
          badge: "Energy Carrier",
          badgeColor: "indigo",
          title: "NADH & FADH2 Electron Donors",
          desc: "High-energy electrons are fed into Complex I (NADH) and Complex II (FADH2), creating electrochemical redox gradients."
        },
        {
          badge: "Biophysical Motor",
          badgeColor: "purple",
          title: "Chemiosmotic Proton Motive Force",
          desc: "Protons (H+) are pumped into the intermembrane space. Their thermodynamic gradient drives the rotary c-ring of ATP synthase."
        },
        {
          badge: "Bioenergetics",
          badgeColor: "amber",
          title: "Theoretical vs Actual ATP Yield",
          desc: "Theoretical yield is ~36-38 ATP per glucose; actual in vivo yield is ~30-32 ATP due to proton leakage and transport costs."
        }
      ],
      examAlerts: [
        "EXAM TIP: Memorize the exact proton translocation count: Complex I pumps 4 H+, Complex III pumps 4 H+, Complex IV pumps 2 H+ per electron pair.",
        "Crucial distinction: Oligomycin inhibits the F0 subunit (stops proton flow), whereas DNP (dinitrophenol) uncouples the gradient without halting the ETC.",
        "Oxygen is the terminal electron acceptor, reduced to water (H2O) at Complex IV."
      ],
      keyConcepts: [
        {
          term: "Chemiosmosis",
          definition: "The movement of ions across a semipermeable membrane down their electrochemical gradient, used to synthesize ATP."
        },
        {
          term: "Proton Motive Force (PMF)",
          definition: "Energy stored across the inner mitochondrial membrane as both an electrical gradient (membrane potential) and pH difference."
        },
        {
          term: "ATP Synthase (F1F0 complex)",
          definition: "A microscopic rotary turbine enzyme; the F0 hydrophobic ring rotates within the membrane, driving the F1 catalytic head to produce ATP from ADP + Pi."
        },
        {
          term: "Substrate-Level vs Oxidative Phosphorylation",
          definition: "Direct enzymatic transfer of phosphate (glycolysis/Krebs) versus gradient-driven phosphorylation via the electron transport chain."
        }
      ],
      actionItems: [
        { task: "Draw the complete Electron Transport Chain diagram with Complexes I-IV", due: "Wednesday Lab", status: "High Priority" },
        { task: "Review Chapter 9 metabolic yield stoichiometry table", due: "Friday", status: "Reading" },
        { task: "Practice calculations for proton stoichiometry (P/O ratios)", due: "Before Quiz 4", status: "Recommended" }
      ]
    },
    transcript: [
      {
        id: "b1",
        time: "00:00",
        seconds: 0,
        speaker: "Dr. Marcus Vance",
        text: "Welcome back everyone. Today we are diving into nature's ultimate nano-engineering marvel: how living cells harness thermodynamic disequilibrium to manufacture adenosine triphosphate, or ATP.",
        topic: "Introduction"
      },
      {
        id: "b2",
        time: "02:15",
        seconds: 135,
        speaker: "Dr. Marcus Vance",
        text: "Remember from last week, glycolysis yields only a tiny fraction of glucose's free energy—just 2 ATP molecules and 2 NADH. The real energetic bounty requires the powerhouse of the cell: the mitochondrion.",
        topic: "Glycolysis Recap"
      },
      {
        id: "b3",
        time: "06:40",
        seconds: 400,
        speaker: "Dr. Marcus Vance",
        text: "Inside the matrix, the Citric Acid Cycle systematically tears down acetyl groups, stripping electrons onto NAD+ and FAD. Think of NADH and FADH2 as rechargeable battery packs loaded with high reducing potential.",
        topic: "Citric Acid Cycle"
      },
      {
        id: "b4",
        time: "14:10",
        seconds: 850,
        speaker: "Student (Liam)",
        text: "Dr. Vance, does Complex II pump protons across the inner membrane?",
        topic: "Electron Transport Chain"
      },
      {
        id: "b5",
        time: "14:35",
        seconds: 875,
        speaker: "Dr. Marcus Vance",
        text: "Excellent question Liam, and a classic test trap! Complex II, also known as succinate dehydrogenase, does NOT pump any protons. Only Complexes I, III, and IV pump protons. For each NADH, 10 protons are pumped across into the intermembrane space.",
        topic: "Complex II & Proton Counts"
      },
      {
        id: "b6",
        time: "22:00",
        seconds: 1320,
        speaker: "Dr. Marcus Vance",
        text: "Peter Mitchell won the Nobel Prize in 1978 for discovering chemiosmosis. Before Mitchell, scientists searched in vain for a high-energy chemical intermediate. Mitchell realized the energy was stored as an electrochemical proton gradient—the proton motive force.",
        topic: "Chemiosmotic Hypothesis"
      },
      {
        id: "b7",
        time: "31:45",
        seconds: 1905,
        speaker: "Dr. Marcus Vance",
        text: "Look at the F1F0 ATP synthase on the slide. The c-ring literally spins at over 6,000 revolutions per minute as protons pass through the half-channels. This rotation induces conformational shifts in the alpha-beta subunits, forcing ADP and inorganic phosphate together.",
        topic: "ATP Synthase Mechanism"
      },
      {
        id: "b8",
        time: "41:30",
        seconds: 2490,
        speaker: "Dr. Marcus Vance",
        text: "What happens when someone consumes the metabolic poison 2,4-dinitrophenol (DNP)? DNP ferries protons across the membrane, bypassing ATP synthase. The energy dissipates entirely as uncontrolled heat! Body temperature skyrockets fatally. Remember this uncoupling mechanism.",
        topic: "Uncoupling & Inhibitors"
      },
      {
        id: "b9",
        time: "50:00",
        seconds: 3000,
        speaker: "Dr. Marcus Vance",
        text: "To summarize: Glucose oxidation is an electron cascade that pumps protons, which in turn turns a nanoscale turbine to phosphorylate ADP. See you all in lab on Wednesday.",
        topic: "Summary"
      }
    ],
    revision: {
      flashcards: [
        {
          id: "bf1",
          topic: "Proton Pumping",
          front: "Which ETC complexes pump protons into the intermembrane space, and which does not?",
          back: "Complexes I, III, and IV pump protons.\nComplex II (Succinate Dehydrogenase) does NOT pump protons.",
          hint: "Remember the test trap Dr. Vance highlighted.",
          difficulty: "Medium"
        },
        {
          id: "bf2",
          topic: "Terminal Electron Acceptor",
          front: "What is the final electron acceptor in the electron transport chain, and what molecule is produced?",
          back: "Molecular oxygen (O2) is the final electron acceptor at Complex IV. It is reduced to form water (H2O).",
          hint: "Why we breathe oxygen.",
          difficulty: "Easy"
        },
        {
          id: "bf3",
          topic: "ATP Synthase",
          front: "Differentiate between the F0 and F1 subunits of ATP Synthase.",
          back: "F0: Hydrophobic transmembrane subunit that acts as the proton channel and rotating ring.\nF1: Hydrophilic catalytic subunit located in the mitochondrial matrix that synthesizes ATP from ADP + Pi.",
          hint: "One is embedded in lipid bilayer, one sticks into matrix.",
          difficulty: "Medium"
        },
        {
          id: "bf4",
          topic: "Uncoupling",
          front: "What is the physiological effect of an uncoupling agent like DNP (dinitrophenol)?",
          back: "It dissipates the proton motive force by allowing H+ to re-enter the matrix without passing through ATP synthase. Electron transport continues rapidly, but energy is released as heat instead of generating ATP.",
          hint: "Disconnects respiration from phosphorylation.",
          difficulty: "Hard"
        }
      ],
      chapters: [
        {
          title: "1. Glycolysis to the Citric Acid Cycle",
          timestamp: "00:00 - 14:00",
          summary: "Breakdown of glucose into pyruvate, acetyl-CoA synthesis, and electron carrier reduction.",
          keyPoints: [
            "Cytosolic glycolysis produces 2 net ATP and 2 NADH.",
            "Pyruvate dehydrogenase complex bridges glycolysis to the matrix.",
            "Krebs cycle strips electrons to create high-energy NADH & FADH2."
          ]
        },
        {
          title: "2. The Electron Transport Chain & Complex Energetics",
          timestamp: "14:00 - 31:00",
          summary: "Electron flow from Complex I/II through Coenzyme Q, Complex III, Cytochrome C, and Complex IV to Oxygen.",
          keyPoints: [
            "Complex I pumps 4 H+; Complex III pumps 4 H+; Complex IV pumps 2 H+.",
            "Complex II transfers electrons from FADH2 without pumping protons.",
            "Oxygen serves as terminal electron acceptor, forming water."
          ]
        },
        {
          title: "3. Chemiosmosis & The ATP Synthase Rotary Motor",
          timestamp: "31:00 - 52:40",
          summary: "Peter Mitchell's chemiosmotic theory, mechanical rotation of ATP synthase, and uncouplers.",
          keyPoints: [
            "Proton Motive Force combines electrical potential and pH gradient.",
            "F0 c-ring rotates at thousands of RPM.",
            "Uncouplers like DNP vent gradient as heat without ATP synthesis."
          ]
        }
      ],
      quiz: [
        {
          question: "Which complex in the mitochondrial electron transport chain does NOT pump protons?",
          options: [
            "Complex I (NADH dehydrogenase)",
            "Complex II (Succinate dehydrogenase)",
            "Complex III (Cytochrome bc1)",
            "Complex IV (Cytochrome c oxidase)"
          ],
          correctIndex: 1,
          explanation: "Complex II transfers electrons from succinate to ubiquinone via FADH2 with insufficient free energy change to pump protons across the membrane."
        },
        {
          question: "What is the immediate direct energy source that powers the catalytic head of ATP synthase?",
          options: [
            "Direct GTP hydrolysis",
            "The proton electrochemical gradient (Proton Motive Force)",
            "Light photons hitting carotenoids",
            "Sodium ion influx through voltage channels"
          ],
          correctIndex: 1,
          explanation: "Protons flowing down their electrochemical gradient through the F0 channel drive physical rotation that induces conformational changes in the F1 head to make ATP."
        },
        {
          question: "How does 2,4-dinitrophenol (DNP) cause hyperthermia (extreme fever)?",
          options: [
            "It blocks oxygen intake in the lungs",
            "It forces all ATP to hydrolyze immediately",
            "It uncouples electron transport from ATP synthesis, releasing all free energy as heat",
            "It destroys the outer mitochondrial membrane completely"
          ],
          correctIndex: 2,
          explanation: "DNP acts as a lipid-soluble proton carrier, dissipating the proton gradient so fuel oxidation runs at maximum speed while releasing energy as uncontrollable thermal heat."
        }
      ],
      cheatSheet: `### BIO 204 Quick Revision Cheat Sheet
* **Net ATP**: ~30-32 ATP per glucose molecule in human cells.
* **Proton Pumpers**: Complex I (4 H+), Complex III (4 H+), Complex IV (2 H+). Total = 10 H+ per NADH.
* **Complex II**: Succinate ➔ FAD ➔ Q. Pumps 0 H+.
* **Terminal Acceptor**: 1/2 O2 + 2H+ + 2e- ➔ H2O.
* **ATP Synthase**: F0 (membrane turbine), F1 (matrix catalytic factory).
* **Inhibitors vs Uncouplers**: Oligomycin blocks F0 channel; DNP punctures the gradient, releasing heat.`
    }
  },
  {
    id: "lec-econ102",
    code: "ECON 102",
    title: "Microeconomics: Price Elasticity of Demand & Market Surplus",
    professor: "Prof. Sarah Sterling",
    department: "Department of Economics",
    duration: "45:10",
    durationSeconds: 2710,
    recordedDate: "Nov 02, 2026",
    summary: {
      synopsis:
        "An analytical exploration of price elasticity of demand (PED) and supply (PES), utilizing the midpoint formula to eliminate directional bias. Prof. Sterling explains the Total Revenue Test, income elasticity (normal vs inferior goods), cross-price elasticity (substitutes vs complements), and demonstrates how tax incidence is governed by relative elasticity rather than legislative mandate.",
      keyTakeaways: [
        {
          badge: "Formula & Measurement",
          badgeColor: "blue",
          title: "The Midpoint Formula for PED",
          desc: "Measures percentage change in quantity demanded relative to percentage change in price, using average bases to ensure symmetry."
        },
        {
          badge: "Managerial Insight",
          badgeColor: "emerald",
          title: "The Total Revenue Test",
          desc: "When demand is inelastic (|PED| < 1), price increases raise total revenue. When elastic (|PED| > 1), price cuts raise total revenue."
        },
        {
          badge: "Market Dynamics",
          badgeColor: "amber",
          title: "Tax Burden & Deadweight Loss",
          desc: "The economic burden of a tax falls disproportionately on whichever market side is more inelastic (less responsive to price changes)."
        },
        {
          badge: "Cross Elasticity",
          badgeColor: "indigo",
          title: "Substitutes vs Complements",
          desc: "Positive cross-price elasticity signifies substitute goods (e.g. coffee & tea); negative value signifies complements (e.g. coffee & cream)."
        }
      ],
      examAlerts: [
        "EXAM WARNING: Always take the absolute value for Price Elasticity of Demand (|PED|), but NEVER drop the sign for Cross-Price or Income Elasticity!",
        "Midpoint formula calculation trap: Divide by the average of initial and new values, not just the starting value.",
        "Tax incidence rule: Whoever has fewer alternatives bears the higher tax burden."
      ],
      keyConcepts: [
        {
          term: "Price Elasticity of Demand (PED)",
          definition: "A metric quantifying the sensitivity of quantity demanded of a good to a change in its price (%ΔQd / %ΔP)."
        },
        {
          term: "Inelastic Demand (|PED| < 1)",
          definition: "Quantity demanded changes by a smaller percentage than the price change; typical for necessities without close substitutes (e.g., insulin)."
        },
        {
          term: "Unit Elastic Demand (|PED| = 1)",
          definition: "Percentage change in quantity demanded matches percentage change in price exactly; total revenue is maximized."
        },
        {
          term: "Deadweight Loss",
          definition: "The loss of economic efficiency and social surplus that occurs when equilibrium for a good is not reached (e.g. due to taxation)."
        }
      ],
      actionItems: [
        { task: "Complete Problem Set 4 on Midpoint calculations", due: "Thursday 5:00 PM", status: "High Priority" },
        { task: "Read Krugman & Wells Chapter 6 on Tax Incidence", due: "Next Tuesday", status: "Reading" },
        { task: "Practice graph derivations for perfectly inelastic demand curves", due: "Before Midterm", status: "Recommended" }
      ]
    },
    transcript: [
      {
        id: "e1",
        time: "00:00",
        seconds: 0,
        speaker: "Prof. Sarah Sterling",
        text: "Good afternoon. If you run a company like Netflix or Spotify and you raise your monthly subscription price by two dollars, will your revenue go up or will millions of subscribers cancel? That is the heart of elasticity.",
        topic: "Introduction"
      },
      {
        id: "e2",
        time: "03:10",
        seconds: 190,
        speaker: "Prof. Sarah Sterling",
        text: "Elasticity is responsiveness. Specifically, Price Elasticity of Demand measures how aggressively consumers cut back or increase consumption when the price shifts by a certain percentage.",
        topic: "Definition of Elasticity"
      },
      {
        id: "e3",
        time: "08:50",
        seconds: 530,
        speaker: "Prof. Sarah Sterling",
        text: "Why can't we just use regular percentage change? Because if price moves from $10 to $12, that is a 20% increase. But from $12 to $10 is a 16.6% decrease! To solve this asymmetry, economists universally use the Midpoint Formula.",
        topic: "The Midpoint Formula"
      },
      {
        id: "e4",
        time: "15:20",
        seconds: 920,
        speaker: "Student (Carlos)",
        text: "Professor Sterling, if demand for gasoline is inelastic, why wouldn't oil companies just charge $50 a gallon?",
        topic: "Inelasticity in the Real World"
      },
      {
        id: "e5",
        time: "15:55",
        seconds: 955,
        speaker: "Prof. Sarah Sterling",
        text: "Carlos, that is the difference between short-run and long-run elasticity! In the short run, you must drive to work tomorrow, so demand is steep and inelastic. But in the long run, consumers buy electric cars, move closer to transit, or carpool. Demand becomes much more elastic over time.",
        topic: "Short Run vs Long Run"
      },
      {
        id: "e6",
        time: "24:30",
        seconds: 1470,
        speaker: "Prof. Sarah Sterling",
        text: "Let's examine the Total Revenue Test. Total Revenue equals Price times Quantity. When demand is inelastic, the price effect dominates the quantity effect. Raise price, revenue rises. When demand is elastic, the quantity effect dominates. Raise price, revenue drops!",
        topic: "Total Revenue Test"
      },
      {
        id: "e7",
        time: "35:10",
        seconds: 2110,
        speaker: "Prof. Sarah Sterling",
        text: "Here is your exam question guarantee: Politicians frequently argue about whether a payroll tax or sales tax is paid by workers or employers. Economics proves that who writes the check to the government is completely irrelevant. The side with the most inelastic curve bears the burden.",
        topic: "Tax Incidence Principle"
      },
      {
        id: "e8",
        time: "43:00",
        seconds: 2580,
        speaker: "Prof. Sarah Sterling",
        text: "Please work through the five practice problems at the end of Chapter 6 before recitation on Thursday. Have a great afternoon.",
        topic: "Conclusion"
      }
    ],
    revision: {
      flashcards: [
        {
          id: "ef1",
          topic: "Revenue Test",
          front: "If demand for a product is price elastic (|PED| > 1), what happens to Total Revenue when the firm raises the price?",
          back: "Total Revenue decreases.\nThe percentage drop in quantity demanded exceeds the percentage increase in price.",
          hint: "Quantity effect dominates price effect.",
          difficulty: "Medium"
        },
        {
          id: "ef2",
          topic: "Cross-Price Elasticity",
          front: "If Cross-Price Elasticity of Demand (XED) between Good A and Good B is +1.8, what is their relationship?",
          back: "They are substitute goods. A price increase in Good B causes consumers to switch and demand more of Good A.",
          hint: "Sign matters: Positive = Substitute, Negative = Complement.",
          difficulty: "Easy"
        },
        {
          id: "ef3",
          topic: "Tax Burden",
          front: "Who bears the greater economic burden of an excise tax: buyers or sellers?",
          back: "Whichever party is more price inelastic (less responsive to price shifts / has fewer alternative choices).",
          hint: "The side that is 'trapped' pays the tax.",
          difficulty: "Medium"
        },
        {
          id: "ef4",
          topic: "Time Horizon",
          front: "Why is the price elasticity of demand for a good generally higher in the long run than in the short run?",
          back: "Consumers and businesses have more time to find substitutes, adopt new technologies, and alter consumption habits in the long run.",
          hint: "Think about alternatives available over 1 day vs 5 years.",
          difficulty: "Easy"
        }
      ],
      chapters: [
        {
          title: "1. Conceptualizing Elasticity & The Midpoint Equation",
          timestamp: "00:00 - 15:00",
          summary: "Definition of price responsiveness, the direction problem in standard percentages, and the midpoint solution.",
          keyPoints: [
            "Elasticity measures percentage responsiveness, avoiding arbitrary unit biases.",
            "Midpoint formula uses (Q2-Q1)/[(Q1+Q2)/2] and (P2-P1)/[(P1+P2)/2].",
            "PED is reported as an absolute value."
          ]
        },
        {
          title: "2. The Total Revenue Curve & Time Horizons",
          timestamp: "15:00 - 32:00",
          summary: "How elasticity shifts across a single linear demand curve and dictates revenue maximization.",
          keyPoints: [
            "Inelastic demand: Price & Revenue move in same direction.",
            "Elastic demand: Price & Revenue move in opposite directions.",
            "Goods become substantially more elastic over extended time horizons."
          ]
        },
        {
          title: "3. Tax Incidence, Deadweight Loss & Cross Elasticities",
          timestamp: "32:00 - 45:10",
          summary: "Why statutory tax assignment is an illusion and how relative elasticities determine real tax incidence.",
          keyPoints: [
            "Inelastic supply or demand absorbs the lion's share of tax burden.",
            "Positive XED indicates substitutes; negative XED indicates complements.",
            "Deadweight loss rises with the square of the tax rate."
          ]
        }
      ],
      quiz: [
        {
          question: "A movie theater raises ticket prices by 10% and experiences a 15% decrease in attendance. What is the demand elasticity?",
          options: [
            "Inelastic (|PED| = 0.67)",
            "Elastic (|PED| = 1.5)",
            "Unit Elastic (|PED| = 1.0)",
            "Perfectively Inelastic (|PED| = 0)"
          ],
          correctIndex: 1,
          explanation: "|PED| = %ΔQd / %ΔP = 15% / 10% = 1.5. Since 1.5 > 1, the demand is price elastic."
        },
        {
          question: "When a government levies a tax on cigarettes, why do smokers bear the vast majority of the tax burden rather than tobacco companies?",
          options: [
            "The law explicitly mandates that sellers are immune from tax",
            "Cigarette demand is highly inelastic due to nicotine addiction, while supply is comparatively elastic",
            "Sellers refuse to pay taxes on moral grounds",
            "Cigarette manufacturers have zero fixed costs"
          ],
          correctIndex: 1,
          explanation: "Addiction makes quantity demanded relatively unresponsive to price changes (inelastic). Consumers cannot easily substitute away, so sellers pass almost the entire tax forward in higher retail prices."
        },
        {
          question: "If an income increase of 5% leads to a 10% drop in demand for powdered instant ramen, instant ramen is classified as:",
          options: [
            "A luxury good",
            "A normal good",
            "An inferior good",
            "A Giffen good"
          ],
          correctIndex: 2,
          explanation: "Income Elasticity of Demand = -10% / 5% = -2.0. A negative income elasticity designates an inferior good (as consumers get richer, they buy higher quality substitutes)."
        }
      ],
      cheatSheet: `### ECON 102 Quick Revision Cheat Sheet
* **PED Formula**: |(%ΔQd) / (%ΔP)| using midpoint averages.
* **Elasticity Classes**: |PED| > 1 (Elastic), |PED| < 1 (Inelastic), |PED| = 1 (Unit Elastic).
* **Revenue Test**:
  - Inelastic: P ↑ ➔ TR ↑ (Price effect wins)
  - Elastic: P ↑ ➔ TR ↓ (Quantity effect wins)
* **Cross-Price Elasticity (XED)**:
  - Positive ➔ Substitutes (Coffee & Tea)
  - Negative ➔ Complements (Hot dogs & Buns)
* **Tax Incidence Rule**: Inelastic side always pays the tax!`
    }
  }
];
