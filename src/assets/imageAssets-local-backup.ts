// Centralized image assets configuration
// All project images organized by category

// Projects - Flats & Apartments
import project1 from './images/WhatsApp Image 2026-02-26 at 7.15.12 PM.jpeg';
import project2 from './images/WhatsApp Image 2026-02-26 at 7.15.12 PM (1).jpeg';
import project3 from './images/WhatsApp Image 2026-02-26 at 7.15.13 PM.jpeg';

// Projects - Villas & Homes
import project4 from './images/WhatsApp Image 2026-02-26 at 7.15.13 PM (1).jpeg';
import project5 from './images/WhatsApp Image 2026-02-26 at 7.15.13 PM (2).jpeg';

// Projects - Commercial
import project6 from './images/WhatsApp Image 2026-02-26 at 7.15.14 PM.jpeg';
import project7 from './images/WhatsApp Image 2026-02-26 at 7.15.14 PM (1).jpeg';

// Projects - Plots
import project8 from './images/WhatsApp Image 2026-02-26 at 7.15.14 PM (2).jpeg';
import project9 from './images/WhatsApp Image 2026-02-26 at 7.15.15 PM.jpeg';

// Location images
import chennaiLocation from './images/WhatsApp Image 2026-02-26 at 7.15.15 PM (1).jpeg';
import tirunelveliLocation from './images/WhatsApp Image 2026-02-26 at 7.15.15 PM (2).jpeg';
import chengalpattuLocation from './images/WhatsApp Image 2026-02-26 at 7.15.16 PM.jpeg';

// Leadership team images
import leader1 from './images/WhatsApp Image 2026-02-26 at 7.15.16 PM (1).jpeg';
import leader2 from './images/WhatsApp Image 2026-02-26 at 7.15.16 PM (2).jpeg';
import leader3 from './images/WhatsApp Image 2026-02-26 at 7.15.16 PM (3).jpeg';

// Services - Highway Construction
import highway1 from './images/WhatsApp Image 2026-02-26 at 7.15.17 PM.jpeg';
import highway2 from './images/WhatsApp Image 2026-02-26 at 7.15.17 PM (1).jpeg';
import highway3 from './images/WhatsApp Image 2026-02-26 at 7.15.17 PM (2).jpeg';
import highway4 from './images/WhatsApp Image 2026-02-26 at 7.15.18 PM.jpeg';

// Services - Warehouse Development
import warehouse1 from './images/WhatsApp Image 2026-02-26 at 7.15.18 PM (1).jpeg';
import warehouse2 from './images/WhatsApp Image 2026-02-26 at 7.15.18 PM (2).jpeg';
import warehouse3 from './images/WhatsApp Image 2026-02-26 at 7.15.18 PM (3).jpeg';
import warehouse4 from './images/WhatsApp Image 2026-02-26 at 7.15.19 PM.jpeg';

// Services - Township Development
import township1 from './images/WhatsApp Image 2026-02-26 at 7.15.19 PM (1).jpeg';
import township2 from './images/WhatsApp Image 2026-02-26 at 7.15.19 PM (2).jpeg';
import township3 from './images/WhatsApp Image 2026-02-26 at 7.15.20 PM.jpeg';
import township4 from './images/WhatsApp Image 2026-02-26 at 7.15.20 PM (1).jpeg';

// CSR & Community images
import csr1 from './images/WhatsApp Image 2026-02-26 at 7.15.20 PM (2).jpeg';
import csr2 from './images/WhatsApp Image 2026-02-26 at 7.15.21 PM.jpeg';
import csr3 from './images/WhatsApp Image 2026-02-26 at 7.15.21 PM (1).jpeg';
import csr4 from './images/WhatsApp Image 2026-02-26 at 7.15.21 PM (2).jpeg';

// Partner & Events images
import partner1 from './images/WhatsApp Image 2026-02-26 at 7.15.21 PM (3).jpeg';
import partner2 from './images/WhatsApp Image 2026-02-26 at 7.15.22 PM.jpeg';
import partner3 from './images/WhatsApp Image 2026-02-26 at 7.15.22 PM (1).jpeg';
import partner4 from './images/WhatsApp Image 2026-02-26 at 7.15.22 PM (2).jpeg';
import event1 from './images/WhatsApp Image 2026-02-26 at 7.15.23 PM.jpeg';

// Export organized image assets
export const projectImages = {
  flatsAndApartments: [project1, project2, project3],
  villasAndHomes: [project4, project5],
  commercial: [project6, project7],
  plots: [project8, project9],
};

export const locationImages = {
  chennai: chennaiLocation,
  tirunelveli: tirunelveliLocation,
  chengalpattu: chengalpattuLocation,
};

export const leadershipImages = [leader1, leader2, leader3];

export const serviceImages = {
  highway: [highway1, highway2, highway3, highway4],
  warehouse: [warehouse1, warehouse2, warehouse3, warehouse4],
  township: [township1, township2, township3, township4],
};

export const csrImages = [csr1, csr2, csr3, csr4];

export const partnerImages = [partner1, partner2, partner3, partner4];

export const eventImages = [event1];

// Single export for easy access
export default {
  projects: projectImages,
  locations: locationImages,
  leadership: leadershipImages,
  services: serviceImages,
  csr: csrImages,
  partners: partnerImages,
  events: eventImages,
};
