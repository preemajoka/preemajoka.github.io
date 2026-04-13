import { 
  Cpu, 
  Settings, 
  Truck, 
  Bike, 
  Wind, 
  Zap, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  Target,
  Factory,
  Database
} from 'lucide-react';

export interface DecisionMatrix {
  criteria: { name: string; weight: number }[];
  options: {
    name: string;
    scores: number[]; // indices match criteria
  }[];
}

export interface ProjectSection {
  title: string;
  content: string;
  image?: string;
  caption?: string;
  decisionMatrix?: DecisionMatrix;
  steps?: { title: string; description: string; images?: string[] }[];
  overview?: {
    what: string;
    why: string;
    how: string;
    outcome: string;
    problem: string;
    constraints: string;
  };
  cards?: { title: string; description: string; badge?: string; icon?: any }[];
  highlight?: { title: string; content: string; type: 'info' | 'warning' | 'success' };
  fsmSteps?: { id: string; label: string; description: string }[];
  detailedFSM?: {
    base: { id: string; label: string; description: string; outputs?: { name: string; value: string }[] }[];
    application: { id: string; label: string; description: string; outputs?: { name: string; value: string }[] }[];
    links: { from: { fsm: 'base' | 'app'; id: string }; to: { fsm: 'base' | 'app'; id: string }; condition: string; type: 'solid' | 'dashed' }[];
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  challenge: string;
  approach: string;
  approachImages?: string[];
  impact: string;
  impactImages?: string[];
  icon: any;
  tags: string[];
  progress: number; // 0 to 100
  completionDate: string; // YYYY-MM-DD
  videoUrl?: string;
  videoThumbnail?: string;
  videoPosition?: string;
  videoScale?: number;
  imagePosition?: string;
  imageScale?: number;
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
  posterUrl?: string;
  detailedSections?: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: 'electrodeposition-system',
    title: 'ARTMS-Radioisotope Target Electrodeposition System',
    subtitle: 'Mechatronics Design & PCB Development',
    image: '/electrodeposition_pcb.png',
    imagePosition: 'center',
    imageScale: 1.3,
    imageFit: 'contain',
    imageBg: '#ffffff',
    challenge: 'Design & manufacture a device that controls electroplating rates for ARTMS Radioisotope Targets. Conducted a needs analysis to begin the design cycle.',
    approach: 'Used SolidWorks to design prototype and route harnesses. Applied GD&T on all drawings. 3D Printed and assembled prototype for bench testing. Used KiCad to create schematics and design PCB. Applied IPC-2221 standards.',
    impact: 'Design achieved its purpose, displayed voltage and current readings with 97% accuracy. Successfully released product within 8 months. Minimal and cleaner harness routing, reduced assembly time by 2 hours. Protected $1M+ in yearly manufactured assets.',
    icon: Cpu,
    tags: ['SolidWorks', 'KiCad', 'GD&T', 'PCB Design', 'Mechatronics'],
    progress: 100,
    completionDate: '2025-09-15',
    impactImages: ['/electrodeposition_final_result.png']
  },
  {
    id: 'irradiation-system',
    title: 'ARTMS-Irradiation System for Siemens Eclipse Cyclotron',
    subtitle: 'Miniaturization & Spatial Optimization',
    image: '/siemens_target_station.png',
    imagePosition: 'center',
    imageScale: 1.3,
    imageFit: 'contain',
    imageBg: '#ffffff',
    challenge: 'Design & miniaturize ARTMS irradiation system for increasing compatibility with Siemens Eclipse cyclotron. Conducted a needs analysis prior to design cycle.',
    approach: 'Defined spatial constraints using Polycam site scans. Modeled parts and full assembly in SolidWorks. 3D Printed and assembled prototype for demonstration.',
    approachImages: ['/siemens_ts_prototype_3DP.png'],
    impact: 'Achieved 70% volumetric reduction. Future-proofed the design by sourcing and documenting space-optimized component alternatives.',
    icon: Target,
    tags: ['SolidWorks', 'Polycam', '3D Printing', 'Design Optimization'],
    progress: 60,
    completionDate: '2025-08-20'
  },
  {
    id: 'bracket-redesign',
    title: 'Hexagon Purus: Aux Module Structural Bracket Redesign',
    subtitle: 'Structural Engineering & FEA Analysis',
    image: '/hexagon_bracket.jpeg',
    imageFit: 'cover',
    imagePosition: 'center 55%',
    challenge: 'Design a chassis-to-module structural mount while navigating severe packaging constraints, brake line interference, and address current tooling access deficiencies.',
    approach: 'Used Creo to design and simulate the side-brace structural bracket. Redefined subassembly. Applied 3G loading conditions to verify FEA static and modal performance.',
    impact: 'Improved tooling clearances and consolidated hardware, achieving a 30% reduction in unique fasteners. Retained 98% structural performance while maximizing stiffness-to-weight via targeted gussets and flanges.',
    icon: Truck,
    tags: ['Creo', 'FEA', 'Structural Design', 'Vehicle Integration'],
    progress: 100,
    completionDate: '2024-12-10'
  },
  {
    id: 'okmotorrad-mvp',
    title: 'OKMotorrad: MVP, Chassis Design & Top-Level Assembly',
    subtitle: 'Electric Motorcycle Development',
    image: 'https://picsum.photos/seed/motorcycle/1200/600',
    videoThumbnail: '/motostudent_prototype.mp4',
    videoPosition: 'center 40%',
    videoScale: 1.1,
    challenge: 'Build a minimum viable electric motorbike prototype with $0 in funding to attract School of Engineering and external sponsors. Limited time, project was constrained to 3 months.',
    approach: 'Repurposed a scrap dirt bike chassis and BLDC motor kit. Bench-tested functionality with a 60V power supply. Modeled and 3D printed mounting brackets in SolidWorks. Used SolidWorks Weldments for designing trellis frame. Conducted FEA for structural performance evaluation at 250kg saddle and 300kg front loading.',
    impact: 'Successfully secured 8 external sponsors in 3 months, recruited 20+ members. Accomplished 60% of total design, allowing to focus on simulations-based iterations. Established main frame topology.',
    icon: Bike,
    tags: ['SolidWorks', 'Weldments', 'FEA', 'Electric Vehicles', 'Leadership'],
    progress: 45,
    completionDate: '2025-12-01'
  },
  {
    id: 'capstone-test-rig',
    title: 'Capstone: Test Rig Design & Capsule Tracking Coupler',
    subtitle: 'Pneumatic Systems & Sensor Integration',
    image: 'https://picsum.photos/seed/pneumatic/1200/600',
    videoThumbnail: '/capstone_thumbnail.mp4',
    videoScale: 1.1,
    challenge: 'In medical isotope production, aluminum capsules carrying radioactive targets are propelled at high speeds through pneumatic lines between cyclotrons and processing hot cells. These systems suffer from frequent capsule jams, and currently, there is no real-time feedback or tracking. When a jam occurs, operators have no way to pinpoint the capsule location within the sealed, radioactive environment, leading to massive production downtime and increased radiation exposure during manual recovery.',
    approach: 'Engineered a non-invasive, multi-modal sensing system using Inductive, Accelerometer, and Time-of-Flight (ToF) sensors. Developed a fully sealed pneumatic test rig (80-110 PSI) to simulate irradiation cycles and validate tracking accuracy. Integrated custom sensor PCBs with a central interface and a live HMI for real-time operator feedback.',
    impact: 'Successfully demonstrated real-time capsule tracking with >99% reliability across three distinct sensing modalities. The system allows operators to pinpoint jam locations instantly on an HMI, reducing system downtime by an estimated 70% and significantly lowering radiation exposure risks.',
    icon: Wind,
    tags: ['SolidWorks', 'Pneumatics', 'Sensor Integration', 'ALARA', '3D Printing', 'Inductive Sensing', 'ToF', 'HMI'],
    progress: 100,
    completionDate: '2026-05-01',
    videoUrl: 'https://www.youtube.com/embed/qni2ZHnxNtM',
    posterUrl: '/Capstone_Poster.pdf',
    detailedSections: [
      {
        title: "The Objective: Why We Built It",
        content: "Medical isotope production is a race against time; isotopes have short half-lives and must reach patients quickly. Our mission was to eliminate the operational 'blind spot' that threatens this supply chain whenever a capsule fails to reach its destination.",
        overview: {
          what: "Real-time capsule tracking and jam detection for pneumatic transfer lines",
          why: "Eliminate the 'blind spot' in isotope production to reduce downtime and radiation exposure",
          how: "Redundant sensor fusion (Inductive, Accelerometer, ToF) integrated into a non-invasive sleeve design",
          outcome: "Instantaneous jam localization on a live HMI with high detection reliability",
          problem: "The current ARTMS QIS system operates on a 'fire and forget' principle. Once a capsule is launched, it effectively enters a black box until it arrives at the hot cell. If a jam occurs mid-transit, operators are left guessing, forced to manually inspect meters of radioactive piping. This lack of visibility transforms a simple mechanical issue into a high-stakes recovery mission that halts life-saving isotope production.",
          constraints: "Must be non-invasive to maintain hose pressure (80-110 PSI), comply with ISO 7 cleanroom standards, and fit within the extremely tight spatial constraints of existing medical cyclotron facilities."
        },
        image: "/qis_worflow.png",
        caption: "High-level overview of the ARTMS QIS workflow. Our system monitors the 'blind spot' within the transfer hose."
      },
      {
        title: "The Evolution: How We Got There",
        content: "As the Mechanical Design Lead, the challenge was to create a detection system that could withstand a highly pressurized (80-110 PSI) environment while complying with strict ISO 7 cleanroom and ALARA radiation standards. The design moved from broad concepts to a testable sensing system.",
        steps: [
          { title: "Identify the 'Blind Spot'", description: "We analyzed the ARTMS QIS workflow and identified that jammed capsules were impossible to locate without manual, high-risk inspection." },
          { title: "Map Industrial Constraints", description: "Any solution had to be non-invasive to preserve hose pressure (110 PSI) and fit within the tight spatial footprint of cyclotron facilities." },
          { title: "Evaluate Sensing Modalities", description: "We compared robotic and sensing approaches, ultimately choosing a redundant sensor fusion model for maximum reliability." },
          { title: "Weighted Decision Matrix", description: "Sensor concepts scored highest for safety and ease of integration, leading us to the Inductive/Accelerometer/ToF array." },
          { title: "Prototype & Validate", description: "We built a high-pressure bench rig and confirmed that synchronized sensor spikes could accurately pinpoint capsule location." }
        ],
        decisionMatrix: {
          criteria: [
            { name: "Spatial Compatibility", weight: 0.25 },
            { name: "Reliability (Radiation)", weight: 0.30 },
            { name: "System Complexity", weight: 0.20 },
            { name: "Maintenance Ease", weight: 0.15 },
            { name: "Detection Accuracy", weight: 0.10 }
          ],
          options: [
            { name: "Wheel Bot", scores: [2, 1, 2, 1, 4] },
            { name: "Screw Bot", scores: [1, 1, 1, 1, 4] },
            { name: "Inductive", scores: [5, 4, 5, 4, 3] },
            { name: "Time of Flight", scores: [5, 3, 5, 4, 4] },
            { name: "Accelerometer", scores: [5, 5, 5, 5, 3] },
            { name: "Hall Effect", scores: [5, 2, 5, 4, 2] }
          ]
        }
      },
      {
        title: "What we built",
        content: "We developed a functional bench-scale prototype that successfully tracks capsule movement in real-time. The system bridges the gap between raw physical signals and actionable operator data through a custom hardware-software stack.",
        cards: [
          { title: "Multi-Modal Sensing Nodes", description: "Checkpoint nodes that combine three sensing technologies to ensure a capsule is never 'lost' during transfer." },
          { title: "Central Interface PCB", description: "A custom-engineered board that aggregates high-speed sensor data and prepares it for the HMI." },
          { title: "Live HMI Dashboard", description: "A real-time interface that displays capsule position, velocity, and jam alerts to the operator." },
          { title: "Pneumatic Test Bench", description: "A high-pressure (110 PSI) validation rig that replicates the mechanical stresses of the ARTMS QIS environment." }
        ],
        highlight: {
          title: "My Responsibility",
          content: "I proposed this project to ARTMS based on my prior experience with them. I designed and fabricated the full test rig assembly, led the design and reviews for the mechanical coupler, and produced the engineering drawings. I also reviewed the PCB designs and assisted in building the inductive sensor.",
          type: "info"
        },
        image: "/final_design_model.png",
        caption: "Final CAD model of the modular checkpoint system, integrating the mechanical coupler and custom sensing electronics."
      },
      {
        title: "Why three sensing modes were stronger than one",
        content: "To solve the jam problem, reliability is everything. We implemented a redundant 'sensor fusion' approach to ensure that even if one modality fails or is noisy, the system still provides accurate tracking.",
        cards: [
          { title: "Inductive Sensing", description: "Detects the aluminum capsule through the hose wall by measuring changes in magnetic resonance. Immune to optical interference." },
          { title: "Accelerometer", description: "Employs an inertial accelerometer to capture mechanical disturbances, registering an acceleration spike to verify capsule passage." },
          { title: "Time of Flight (ToF)", description: "Direct laser distance sensing that provides sub-millimeter accuracy for precise capsule positioning at the checkpoint." }
        ],
        highlight: {
          title: "Key Decision",
          content: "Accelerometer sensing scored highest in initial tests, but we implemented all three to ensure >99.99% detection reliability in radioactive environments.",
          type: "success"
        }
      },
      {
        title: "Component Breakdown",
        content: "The system was divided into three core component groups: the mechanical interface, the custom electronics, and the operator interface.",
        steps: [
          { 
            title: "Test setup and mechanical interface", 
            description: "Physical test environment used to validate the prototype. Includes 3D-printed connection hardware and the Polycarbonate hose coupler.",
            images: ["/test_rig_exploded.png"]
          },
          { 
            title: "PCBs and sensing hardware", 
            description: "Custom sensor PCBs designed to mount directly on the hose, and an interface board to gather signals from distributed nodes.",
            images: ["/custom_sensor_pcb.jpg"]
          },
          { 
            title: "Human-machine interface", 
            description: "Two interface directions: one for demonstration and one intended for PLC-oriented industrial integration.",
            images: ["/pc_hmi.png", "/plc_hmi.png"]
          }
        ],
        image: "/bench_scale_test_setup.jpg",
        caption: "The original bench-scale laboratory test setup built to replicate the ARTMS QIS pneumatic transfer environment for prototype validation."
      },
      {
        title: "Testing & Validation",
        content: "Our validation tests proved that the system could successfully detect and track capsules at operational pressures. We achieved clear, synchronized signal spikes across all three modalities, confirming that the 'blind spot' can be eliminated.",
        image: "/sensor_data.png",
        caption: "Synchronized sensor data plot showing clear, detectable spikes from all three modalities as the capsule passes the checkpoint.",
        highlight: {
          title: "Impact & Results",
          content: "We successfully sensed the capsule using all three modalities and displayed real-time position data on the HMI. This proves that a non-invasive, redundant system can provide the critical feedback needed to manage capsule jams in medical isotope production.",
          type: "success"
        }
      },
      {
        title: "Limitations & Future Improvements",
        content: "While the prototype proved feasibility, we identified several areas for refinement to reach production maturity.",
        cards: [
          { title: "Production-ready electronics", description: "Refine the sensor PCB with a 3-4 layer stack-up and simpler industrial connectors." },
          { title: "Industrial Integration", description: "Replace USB testing links with plant-ready protocols such as MODBUS or PROFINET." },
          { title: "Non-Invasive Sleeve Design", description: "Replace coupler with a wrap-around sleeve to eliminate air leakage failure points and make solution less invasive." },
          { title: "Sensor Reliability", description: "Add startup self-tests, periodic calibration, and improved ToF packaging to improve detection reliability." }
        ],
        highlight: {
          title: "Testing Limits",
          content: "FMEA showed the highest-risk issues were coupler integrity and sensor reliability. We were unable to fully test the inductive path in the final rig, which remains a priority for next-phase validation.",
          type: "warning"
        }
      }
    ]
  },
  {
    id: 'pick-by-light-mes',
    title: 'Manufacturing Execution System (MES) for Pick-by-Light Station',
    subtitle: 'Industrial Automation & IT/OT Integration',
    image: '/profile_machine.jpg',
    videoThumbnail: '/mes_thumbnail.mp4',
    videoPosition: 'center',
    videoScale: 1.0,
    imageBg: '#ffffff',
    challenge: 'In the Festo CP Lab, a simulated 8-station mobile phone assembly line, manual operations at Station 4 (Pick-by-Light) were a critical bottleneck. The lack of synchronization between high-level order management (IT) and shop-floor hardware (OT) led to frequent assembly errors, inconsistent inventory tracking, and skewed OEE metrics due to minor human-induced faults.',
    approach: 'Engineered a three-tier control system aligned with the ISA-95 standard. Developed a PyQt5-based MES for order orchestration and inventory management, an asynchronous Python OPC UA client for high-speed (10Hz) PLC synchronization, and a Siemens S7 PLC program utilizing a 6-state Finite State Machine (FSM) with integrated Poka-Yoke (error-proofing) logic.',
    impact: 'Successfully bridged the IT/OT gap, achieving <1s response time from RFID detection to HMI instruction. Implemented a 10-minute fault suppression timer that improved OEE accuracy and established 100% digital traceability for every unit via RFID-mapped database logging. Reduced assembly errors through real-time light-curtain and vision sensor interlocking.',
    icon: Factory,
    tags: ['Siemens S7 PLC', 'OPC UA', 'PyQt5', 'SQLite', 'Industrial IoT', 'ISA-95', 'Poka-Yoke'],
    progress: 100,
    completionDate: '2026-04-09',
    videoUrl: 'https://www.youtube.com/embed/O2WdEl5ww_U',
    detailedSections: [
      {
        title: "System Context: The Festo CP Lab",
        content: "The project was developed for the Festo Cyber-Physical Lab, a state-of-the-art simulation of a modern smart factory. Station 4 (Pick-by-Light) is the only manual module in an 8-station line that includes automated measuring, drilling, pressing, and labeling nodes.",
        overview: {
          what: "A multi-layered control system for a manual assembly cell within a mobile phone production line.",
          why: "To resolve persistent inefficiencies in order registration and real-time information circulation.",
          how: "Integrating a Python-based MES with a Siemens S7 PLC via OPC UA and PROFINET protocols.",
          outcome: "A flexible, reliable production cycle that minimizes human intervention and ensures 100% manufacturing precision.",
          problem: "Station 4 operated on a 'fire and forget' principle, with no real-time feedback or digital audit trail for manual assembly steps.",
          constraints: "Must comply with pre-configured conveyor speeds and maintain minimal network latency (<1s) for fluid operator workflow."
        },
        cards: [
          { title: "Magazine-Front", description: "Initial pallet loading and front cover dispensing." },
          { title: "Station 4 (PBL)", description: "Manual configuration of PCBs, fuses, and cover colors." },
          { title: "Press & Labeling", description: "Automated final assembly and product identification." },
          { title: "Output Station", description: "Final quality check and pallet release." }
        ]
      },
      {
        title: "Architectural Design: The ISA-95 Stack",
        content: "The system follows a Service-Oriented Architecture (SOA) organized into three hierarchical tiers. A key innovation was the use of the Siemens Job Mailbox feature to create a dynamic HMI, consolidating 40 static screens into just 5 universal templates that adapt to any order configuration.",
        cards: [
          { title: "Planning (MES)", description: "PyQt5 dashboard managing the SQLite database (rfid.db) for users, inventory, and order queues.", icon: Database },
          { title: "Supervisory (HMI)", description: "Dynamic Siemens HMI utilizing Job Mailboxes to reduce 36 assembly screens to 1 universal interface.", icon: Settings },
          { title: "Control (PLC)", description: "Siemens S7 PLC executing the FSM and commanding field devices (RFID, light-curtains, camera).", icon: Cpu },
          { title: "IT/OT Bridge", description: "Asynchronous Python OPC UA client running a 10Hz polling loop for protocol translation.", icon: Layers }
        ],
        highlight: {
          title: "Communication Protocols",
          content: "OPC UA serves as the primary asynchronous bridge for telemetry, while PROFINET handles real-time deterministic hardware communication between the PLC, HMI, and vision camera.",
          type: "info"
        }
      },
      {
        title: "Control Strategy: FSM & Poka-Yoke",
        content: "The assembly sequence is gated by a 6-state Finite State Machine (FSM). By leveraging the Job Mailbox feature, the PLC dynamically pushes order-specific build configurations to the HMI, ensuring the system can handle all possible product variants within a single control logic.",
        steps: [
          { title: "RFID Identification", description: "PLC captures unique Pallet ID; stopper engages to halt the conveyor." },
          { title: "Recipe Retrieval", description: "MES cross-references ID and transmits specific assembly parameters (e.g., 2x Fuses, Red Cover) to PLC memory." },
          { title: "Guided Assembly", description: "PLC illuminates correct component bin indicators; HMI displays visual work instructions." },
          { title: "Hardware Interlock", description: "Light-curtain sensors detect incorrect bin access, triggering an immediate blinking red fault indicator." },
          { title: "Vision Validation", description: "PLC triggers camera check to evaluate assembly against stored order specs before releasing the pallet." }
        ],
        highlight: {
          title: "Error Mitigation",
          content: "The state machine refuses to advance to the camera check until the correct bin sequence is completed, effectively 'gagging' potential errors before they occur.",
          type: "warning"
        },
        detailedFSM: {
          base: [
            { id: '0', label: 'IDLE', description: 'Conveyor stopped, waiting for pallet', outputs: [{ name: 'Q_conv_fwd', value: 'FALSE' }, { name: 'Q_stopper_engage', value: 'TRUE' }] },
            { id: '1', label: 'READY_TO_RECEIVE', description: 'Conveyor moving, ready for pallet', outputs: [{ name: 'Q_conv_fwd', value: 'TRUE' }, { name: 'Q_stopper_engage', value: 'TRUE' }] },
            { id: '2', label: 'PALLET_LOCKED', description: 'Pallet detected and locked at station', outputs: [{ name: 'M_conveyor_locked', value: 'TRUE' }] },
            { id: '3', label: 'PALLET_RELEASE', description: 'Releasing pallet to next station', outputs: [{ name: 'Q_stopper_engage', value: 'FALSE' }, { name: 'Q_conv_fwd', value: 'TRUE' }] }
          ],
          application: [
            { id: '0', label: 'IDLE', description: 'Waiting for conveyor lock', outputs: [{ name: 'M_assembly_done', value: 'FALSE' }] },
            { id: '1', label: 'RFID_READ', description: 'Capturing pallet ID and recipe', outputs: [{ name: 'M_wait_for_mes', value: 'TRUE' }] },
            { id: '2', label: 'STATION_SETUP', description: 'Activating bin indicators', outputs: [{ name: 'Q_bin_fuse_indicator', value: 'TRUE' }] },
            { id: '3', label: 'AWAIT_OPERATOR', description: 'Waiting for manual assembly', outputs: [] },
            { id: '4', label: 'CAMERA_CHECK', description: 'Vision sensor validation', outputs: [{ name: 'Q_camera_trigger', value: 'TRUE' }] },
            { id: '5', label: 'RELEASE', description: 'Assembly complete, notifying conveyor', outputs: [{ name: 'M_assembly_done', value: 'TRUE' }] },
            { id: '99', label: 'ERROR_STATE', description: 'Fault detected, awaiting reset', outputs: [] }
          ],
          links: [
            { from: { fsm: 'base', id: '2' }, to: { fsm: 'app', id: '1' }, condition: 'M_conveyor_locked == TRUE', type: 'dashed' },
            { from: { fsm: 'app', id: '5' }, to: { fsm: 'base', id: '3' }, condition: 'M_assembly_done == TRUE', type: 'dashed' },
            { from: { fsm: 'base', id: '3' }, to: { fsm: 'base', id: '1' }, condition: 'I_conv_end == TRUE', type: 'solid' },
            { from: { fsm: 'app', id: '5' }, to: { fsm: 'app', id: '0' }, condition: 'M_mes_logged == TRUE', type: 'solid' },
            { from: { fsm: 'app', id: '4' }, to: { fsm: 'app', id: '99' }, condition: 'I_camera_fail == TRUE', type: 'solid' },
            { from: { fsm: 'app', id: '99' }, to: { fsm: 'app', id: '4' }, condition: 'I_confirm_button == TRUE', type: 'solid' }
          ]
        }
      },
      {
        title: "Performance Optimization: Fault Suppression",
        content: "A key feature of the MES is the localized suppression timer designed to improve Overall Equipment Effectiveness (OEE) metrics.",
        highlight: {
          title: "OEE Accuracy",
          content: "When an assembly fault is detected, the system initiates a 10-minute internal timer. If resolved within this window, the fault is suppressed from the global downtime log, preventing minor human irregularities from skewing long-term productivity data.",
          type: "success"
        }
      }
    ]
  }
];
