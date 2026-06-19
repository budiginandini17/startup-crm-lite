/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useCallback } from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier (UUID or timestamp string)
 * @property {string} name - Full name of the lead contact
 * @property {string} company - Company or organization name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {'New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost'} status - Pipeline status
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other'} source - Acquisition source
 * @property {string} createdAt - ISO 8601 date string of when the lead was created
 */

/**
 * @typedef {Object} LeadContextValue
 * @property {Lead[]} leads - Array of all leads
 * @property {(formData: Omit<Lead, 'id'|'createdAt'>) => Lead} addLead - Create a new lead
 * @property {(id: string, updates: Partial<Lead>) => void} updateLead - Update an existing lead
 * @property {(id: string) => void} deleteLead - Delete a lead by ID
 * @property {(id: string) => Lead|undefined} getLeadById - Find a lead by ID
 */

/** Default seed data for first-time users with no localStorage data */
const DEFAULT_LEADS = [
  // ── January 2026 ────────────────────────────────────────────────────────
  { id: 'seed-001', name: 'Alice Freeman', company: 'CloudScale Inc.', email: 'alice@cloudscale.io', phone: '+1 (555) 234-5678', status: 'Won', source: 'LinkedIn', value: 85000, owner: 'Sarah', createdAt: '2026-01-03T10:00:00.000Z', contactedAt: '2026-01-05T11:00:00.000Z', meetingAt: '2026-01-08T15:00:00.000Z', proposalAt: '2026-01-12T10:00:00.000Z', wonAt: '2026-01-20T12:00:00.000Z' },
  { id: 'seed-002', name: 'Brad Cooper', company: 'Apex Global', email: 'brad@apex.co', phone: '+1 (555) 987-6543', status: 'Won', source: 'Referral', value: 120000, owner: 'Alex', createdAt: '2026-01-05T14:30:00.000Z', contactedAt: '2026-01-07T11:00:00.000Z', meetingAt: '2026-01-10T15:00:00.000Z', proposalAt: '2026-01-14T10:00:00.000Z', wonAt: '2026-01-22T12:00:00.000Z' },
  { id: 'seed-003', name: 'Claire Danes', company: 'Nova Labs', email: 'claire@novalabs.tech', phone: '+1 (555) 345-6789', status: 'Lost', source: 'LinkedIn', value: 45000, owner: 'David', createdAt: '2026-01-07T09:15:00.000Z', contactedAt: '2026-01-09T10:00:00.000Z' },
  { id: 'seed-004', name: 'David Miller', company: 'Starlight Corp', email: 'david@starlight.com', phone: '+1 (555) 876-5432', status: 'Won', source: 'Cold Call', value: 60000, owner: 'Sarah', createdAt: '2026-01-10T16:00:00.000Z', contactedAt: '2026-01-12T11:00:00.000Z', meetingAt: '2026-01-15T15:00:00.000Z', proposalAt: '2026-01-18T10:00:00.000Z', wonAt: '2026-01-25T12:00:00.000Z' },
  { id: 'seed-005', name: 'Eva Longoria', company: 'Zenith Studio', email: 'eva@zenith.design', phone: '+1 (555) 456-7890', status: 'Won', source: 'Email Campaign', value: 95000, owner: 'Priya', createdAt: '2026-01-12T11:00:00.000Z', contactedAt: '2026-01-14T11:00:00.000Z', meetingAt: '2026-01-17T15:00:00.000Z', proposalAt: '2026-01-20T10:00:00.000Z', wonAt: '2026-01-28T12:00:00.000Z' },
  { id: 'seed-006', name: 'Frank Zhang', company: 'ByteForge', email: 'frank@byteforge.io', phone: '+91 9876543210', status: 'Contacted', source: 'Website', value: 30000, owner: 'Alex', createdAt: '2026-01-14T09:00:00.000Z', contactedAt: '2026-01-16T10:00:00.000Z' },
  { id: 'seed-007', name: 'Grace Kim', company: 'Orbit SaaS', email: 'grace@orbitsaas.com', phone: '+1 (555) 321-4567', status: 'Lost', source: 'LinkedIn', value: 40000, owner: 'David', createdAt: '2026-01-16T12:00:00.000Z', contactedAt: '2026-01-18T11:00:00.000Z' },
  { id: 'seed-008', name: 'Henry Patel', company: 'QuickStart AI', email: 'henry@quickstart.ai', phone: '+1 (555) 654-3210', status: 'Won', source: 'Referral', value: 150000, owner: 'Sarah', createdAt: '2026-01-18T14:00:00.000Z', contactedAt: '2026-01-20T11:00:00.000Z', meetingAt: '2026-01-22T15:00:00.000Z', proposalAt: '2026-01-25T10:00:00.000Z', wonAt: '2026-01-30T12:00:00.000Z' },
  { id: 'seed-009', name: 'Iris Chen', company: 'DataPulse', email: 'iris@datapulse.co', phone: '+1 (555) 789-0123', status: 'New', source: 'Instagram', value: 25000, owner: 'Priya', createdAt: '2026-01-20T10:00:00.000Z' },
  { id: 'seed-010', name: 'Jake Ryan', company: 'Morpho Tech', email: 'jake@morpho.tech', phone: '+1 (555) 234-6789', status: 'Contacted', source: 'Ads', value: 55000, owner: 'Alex', createdAt: '2026-01-22T11:00:00.000Z', contactedAt: '2026-01-24T10:00:00.000Z' },

  // ── February 2026 ───────────────────────────────────────────────────────
  { id: 'seed-011', name: 'Karen Lewis', company: 'AstraPay', email: 'karen@astrapay.com', phone: '+1 (555) 345-7890', status: 'Won', source: 'Referral', value: 110000, owner: 'Sarah', createdAt: '2026-02-02T10:00:00.000Z', contactedAt: '2026-02-04T11:00:00.000Z', meetingAt: '2026-02-07T15:00:00.000Z', proposalAt: '2026-02-10T10:00:00.000Z', wonAt: '2026-02-18T12:00:00.000Z' },
  { id: 'seed-012', name: 'Leo Martin', company: 'NimbusDev', email: 'leo@nimbusdev.io', phone: '+1 (555) 567-8901', status: 'Won', source: 'LinkedIn', value: 75000, owner: 'David', createdAt: '2026-02-04T14:00:00.000Z', contactedAt: '2026-02-06T11:00:00.000Z', meetingAt: '2026-02-09T15:00:00.000Z', proposalAt: '2026-02-12T10:00:00.000Z', wonAt: '2026-02-20T12:00:00.000Z' },
  { id: 'seed-013', name: 'Mia Torres', company: 'Pixelcraft', email: 'mia@pixelcraft.design', phone: '+1 (555) 678-9012', status: 'Meeting Scheduled', source: 'Instagram', value: 38000, owner: 'Priya', createdAt: '2026-02-06T09:00:00.000Z', contactedAt: '2026-02-08T10:00:00.000Z', meetingAt: '2026-02-12T15:00:00.000Z' },
  { id: 'seed-014', name: 'Noah Williams', company: 'Synapse AI', email: 'noah@synapseai.com', phone: '+1 (555) 789-0124', status: 'Won', source: 'Website', value: 200000, owner: 'Alex', createdAt: '2026-02-08T10:00:00.000Z', contactedAt: '2026-02-10T11:00:00.000Z', meetingAt: '2026-02-13T15:00:00.000Z', proposalAt: '2026-02-16T10:00:00.000Z', wonAt: '2026-02-25T12:00:00.000Z' },
  { id: 'seed-015', name: 'Olivia Scott', company: 'FlowHub', email: 'olivia@flowhub.io', phone: '+1 (555) 890-1235', status: 'Lost', source: 'Cold Call', value: 42000, owner: 'David', createdAt: '2026-02-10T11:00:00.000Z', contactedAt: '2026-02-12T10:00:00.000Z' },
  { id: 'seed-016', name: 'Peter Kim', company: 'Solarise SaaS', email: 'peter@solarise.co', phone: '+1 (555) 901-2346', status: 'Proposal Sent', source: 'LinkedIn', value: 88000, owner: 'Sarah', createdAt: '2026-02-12T14:00:00.000Z', contactedAt: '2026-02-14T11:00:00.000Z', meetingAt: '2026-02-17T15:00:00.000Z', proposalAt: '2026-02-20T10:00:00.000Z' },
  { id: 'seed-017', name: 'Quinn Baker', company: 'Codewave', email: 'quinn@codewave.dev', phone: '+1 (555) 012-3457', status: 'Won', source: 'Referral', value: 130000, owner: 'Priya', createdAt: '2026-02-14T09:00:00.000Z', contactedAt: '2026-02-16T11:00:00.000Z', meetingAt: '2026-02-19T15:00:00.000Z', proposalAt: '2026-02-22T10:00:00.000Z', wonAt: '2026-02-28T12:00:00.000Z' },
  { id: 'seed-018', name: 'Rachel Green', company: 'PerfectFit SaaS', email: 'rachel@perfectfit.io', phone: '+1 (555) 123-4568', status: 'New', source: 'Ads', value: 22000, owner: 'Alex', createdAt: '2026-02-16T12:00:00.000Z' },
  { id: 'seed-019', name: 'Sam Johnson', company: 'TechVenture', email: 'sam@techventure.co', phone: '+1 (555) 234-5679', status: 'Contacted', source: 'Website', value: 65000, owner: 'David', createdAt: '2026-02-18T10:00:00.000Z', contactedAt: '2026-02-20T10:00:00.000Z' },
  { id: 'seed-020', name: 'Tina Brooks', company: 'Nucleus Cloud', email: 'tina@nucleuscloud.io', phone: '+1 (555) 345-6780', status: 'Lost', source: 'LinkedIn', value: 50000, owner: 'Sarah', createdAt: '2026-02-20T14:00:00.000Z', contactedAt: '2026-02-22T11:00:00.000Z' },

  // ── March 2026 ──────────────────────────────────────────────────────────
  { id: 'seed-021', name: 'Uma Sharma', company: 'LaunchPad AI', email: 'uma@launchpad.ai', phone: '+91 9123456789', status: 'Won', source: 'LinkedIn', value: 180000, owner: 'Alex', createdAt: '2026-03-02T10:00:00.000Z', contactedAt: '2026-03-04T11:00:00.000Z', meetingAt: '2026-03-07T15:00:00.000Z', proposalAt: '2026-03-10T10:00:00.000Z', wonAt: '2026-03-18T12:00:00.000Z' },
  { id: 'seed-022', name: 'Victor Reyes', company: 'SkyNet CRM', email: 'victor@skynetcrm.com', phone: '+1 (555) 456-7891', status: 'Won', source: 'Referral', value: 92000, owner: 'Priya', createdAt: '2026-03-04T14:00:00.000Z', contactedAt: '2026-03-06T11:00:00.000Z', meetingAt: '2026-03-09T15:00:00.000Z', proposalAt: '2026-03-12T10:00:00.000Z', wonAt: '2026-03-20T12:00:00.000Z' },
  { id: 'seed-023', name: 'Wendy Clark', company: 'Horizon ERP', email: 'wendy@horizonerp.com', phone: '+1 (555) 567-8902', status: 'Meeting Scheduled', source: 'Website', value: 115000, owner: 'David', createdAt: '2026-03-06T09:00:00.000Z', contactedAt: '2026-03-08T10:00:00.000Z', meetingAt: '2026-03-12T15:00:00.000Z' },
  { id: 'seed-024', name: 'Xander Hall', company: 'Luminary Apps', email: 'xander@luminary.app', phone: '+1 (555) 678-9013', status: 'Won', source: 'Instagram', value: 48000, owner: 'Sarah', createdAt: '2026-03-08T11:00:00.000Z', contactedAt: '2026-03-10T11:00:00.000Z', meetingAt: '2026-03-13T15:00:00.000Z', proposalAt: '2026-03-16T10:00:00.000Z', wonAt: '2026-03-24T12:00:00.000Z' },
  { id: 'seed-025', name: 'Yara Ahmed', company: 'PureData', email: 'yara@puredata.io', phone: '+1 (555) 789-0125', status: 'Lost', source: 'Cold Call', value: 32000, owner: 'Alex', createdAt: '2026-03-10T14:00:00.000Z', contactedAt: '2026-03-12T10:00:00.000Z' },
  { id: 'seed-026', name: 'Zack Roberts', company: 'GridOps', email: 'zack@gridops.dev', phone: '+1 (555) 890-1236', status: 'Proposal Sent', source: 'Ads', value: 70000, owner: 'Priya', createdAt: '2026-03-12T10:00:00.000Z', contactedAt: '2026-03-14T11:00:00.000Z', meetingAt: '2026-03-17T15:00:00.000Z', proposalAt: '2026-03-20T10:00:00.000Z' },
  { id: 'seed-027', name: 'Anya Kapoor', company: 'VaultSync', email: 'anya@vaultsync.io', phone: '+91 9234567890', status: 'Won', source: 'LinkedIn', value: 155000, owner: 'David', createdAt: '2026-03-14T09:00:00.000Z', contactedAt: '2026-03-16T11:00:00.000Z', meetingAt: '2026-03-19T15:00:00.000Z', proposalAt: '2026-03-22T10:00:00.000Z', wonAt: '2026-03-29T12:00:00.000Z' },
  { id: 'seed-028', name: 'Ben Thompson', company: 'SwiftSell', email: 'ben@swiftsell.com', phone: '+1 (555) 901-2347', status: 'Contacted', source: 'Referral', value: 39000, owner: 'Sarah', createdAt: '2026-03-16T12:00:00.000Z', contactedAt: '2026-03-18T10:00:00.000Z' },
  { id: 'seed-029', name: 'Cara Singh', company: 'BrightMind AI', email: 'cara@brightmind.ai', phone: '+91 9345678901', status: 'New', source: 'Website', value: 28000, owner: 'Alex', createdAt: '2026-03-18T10:00:00.000Z' },
  { id: 'seed-030', name: 'Dan Foster', company: 'ProPipeline', email: 'dan@propipeline.co', phone: '+1 (555) 012-3458', status: 'Won', source: 'Email Campaign', value: 66000, owner: 'Priya', createdAt: '2026-03-20T14:00:00.000Z', contactedAt: '2026-03-22T11:00:00.000Z', meetingAt: '2026-03-25T15:00:00.000Z', proposalAt: '2026-03-28T10:00:00.000Z', wonAt: '2026-03-31T12:00:00.000Z' },

  // ── April 2026 ──────────────────────────────────────────────────────────
  { id: 'seed-031', name: 'Elena Cruz', company: 'NexaHub', email: 'elena@nexahub.io', phone: '+1 (555) 123-4569', status: 'Won', source: 'LinkedIn', value: 140000, owner: 'David', createdAt: '2026-04-01T10:00:00.000Z', contactedAt: '2026-04-03T11:00:00.000Z', meetingAt: '2026-04-06T15:00:00.000Z', proposalAt: '2026-04-09T10:00:00.000Z', wonAt: '2026-04-17T12:00:00.000Z' },
  { id: 'seed-032', name: 'Felix Wang', company: 'TurboServe', email: 'felix@turboserve.io', phone: '+1 (555) 234-5680', status: 'Won', source: 'Website', value: 98000, owner: 'Sarah', createdAt: '2026-04-03T14:00:00.000Z', contactedAt: '2026-04-05T11:00:00.000Z', meetingAt: '2026-04-08T15:00:00.000Z', proposalAt: '2026-04-11T10:00:00.000Z', wonAt: '2026-04-19T12:00:00.000Z' },
  { id: 'seed-033', name: 'Gloria Park', company: 'DataStream', email: 'gloria@datastream.co', phone: '+1 (555) 345-6781', status: 'Proposal Sent', source: 'Referral', value: 125000, owner: 'Alex', createdAt: '2026-04-05T09:00:00.000Z', contactedAt: '2026-04-07T10:00:00.000Z', meetingAt: '2026-04-10T15:00:00.000Z', proposalAt: '2026-04-13T10:00:00.000Z' },
  { id: 'seed-034', name: 'Hassan Ali', company: 'RocketMetrics', email: 'hassan@rocketmetrics.io', phone: '+1 (555) 456-7892', status: 'Won', source: 'Instagram', value: 72000, owner: 'Priya', createdAt: '2026-04-07T11:00:00.000Z', contactedAt: '2026-04-09T11:00:00.000Z', meetingAt: '2026-04-12T15:00:00.000Z', proposalAt: '2026-04-15T10:00:00.000Z', wonAt: '2026-04-22T12:00:00.000Z' },
  { id: 'seed-035', name: 'Isabelle Moore', company: 'ClearStack', email: 'isabelle@clearstack.dev', phone: '+1 (555) 567-8903', status: 'Lost', source: 'Cold Call', value: 34000, owner: 'David', createdAt: '2026-04-09T14:00:00.000Z', contactedAt: '2026-04-11T10:00:00.000Z' },
  { id: 'seed-036', name: 'James Park', company: 'PinPoint CRM', email: 'james@pinpointcrm.com', phone: '+1 (555) 678-9014', status: 'Meeting Scheduled', source: 'LinkedIn', value: 88000, owner: 'Sarah', createdAt: '2026-04-11T10:00:00.000Z', contactedAt: '2026-04-13T11:00:00.000Z', meetingAt: '2026-04-16T15:00:00.000Z' },
  { id: 'seed-037', name: 'Kenji Tanaka', company: 'SalesMatrix', email: 'kenji@salesmatrix.jp', phone: '+81 9012345678', status: 'Won', source: 'Referral', value: 210000, owner: 'Alex', createdAt: '2026-04-13T09:00:00.000Z', contactedAt: '2026-04-15T11:00:00.000Z', meetingAt: '2026-04-18T15:00:00.000Z', proposalAt: '2026-04-21T10:00:00.000Z', wonAt: '2026-04-28T12:00:00.000Z' },
  { id: 'seed-038', name: 'Lisa Grant', company: 'BluePrint AI', email: 'lisa@blueprintai.com', phone: '+1 (555) 789-0126', status: 'Contacted', source: 'Website', value: 43000, owner: 'Priya', createdAt: '2026-04-15T12:00:00.000Z', contactedAt: '2026-04-17T10:00:00.000Z' },
  { id: 'seed-039', name: 'Mark Stevens', company: 'IntelliPipe', email: 'mark@intellipipe.io', phone: '+1 (555) 890-1237', status: 'New', source: 'Ads', value: 31000, owner: 'David', createdAt: '2026-04-17T10:00:00.000Z' },
  { id: 'seed-040', name: 'Nina Patel', company: 'GrowthEdge', email: 'nina@growthedge.in', phone: '+91 9456789012', status: 'Won', source: 'LinkedIn', value: 105000, owner: 'Sarah', createdAt: '2026-04-19T14:00:00.000Z', contactedAt: '2026-04-21T11:00:00.000Z', meetingAt: '2026-04-24T15:00:00.000Z', proposalAt: '2026-04-27T10:00:00.000Z', wonAt: '2026-04-30T12:00:00.000Z' },

  // ── May 2026 ────────────────────────────────────────────────────────────
  { id: 'seed-041', name: 'Oscar Diaz', company: 'CloudBridge', email: 'oscar@cloudbridge.io', phone: '+1 (555) 901-2348', status: 'Won', source: 'Website', value: 160000, owner: 'Alex', createdAt: '2026-05-01T10:00:00.000Z', contactedAt: '2026-05-03T11:00:00.000Z', meetingAt: '2026-05-06T15:00:00.000Z', proposalAt: '2026-05-09T10:00:00.000Z', wonAt: '2026-05-17T12:00:00.000Z' },
  { id: 'seed-042', name: 'Pamela Stone', company: 'HyperSales', email: 'pamela@hypersales.com', phone: '+1 (555) 012-3459', status: 'Won', source: 'Referral', value: 82000, owner: 'Priya', createdAt: '2026-05-03T14:00:00.000Z', contactedAt: '2026-05-05T11:00:00.000Z', meetingAt: '2026-05-08T15:00:00.000Z', proposalAt: '2026-05-11T10:00:00.000Z', wonAt: '2026-05-19T12:00:00.000Z' },
  { id: 'seed-043', name: 'Rahul Gupta', company: 'Avocado Tech', email: 'rahul@avocadotech.in', phone: '+91 9567890123', status: 'Proposal Sent', source: 'LinkedIn', value: 135000, owner: 'David', createdAt: '2026-05-05T09:00:00.000Z', contactedAt: '2026-05-07T10:00:00.000Z', meetingAt: '2026-05-10T15:00:00.000Z', proposalAt: '2026-05-13T10:00:00.000Z' },
  { id: 'seed-044', name: 'Sophie Laurent', company: 'PixelStream', email: 'sophie@pixelstream.fr', phone: '+33 612345678', status: 'Won', source: 'Instagram', value: 56000, owner: 'Sarah', createdAt: '2026-05-07T11:00:00.000Z', contactedAt: '2026-05-09T11:00:00.000Z', meetingAt: '2026-05-12T15:00:00.000Z', proposalAt: '2026-05-15T10:00:00.000Z', wonAt: '2026-05-22T12:00:00.000Z' },
  { id: 'seed-045', name: 'Thomas Hardy', company: 'ClearVision', email: 'thomas@clearvision.co', phone: '+1 (555) 123-4560', status: 'Lost', source: 'Cold Call', value: 27000, owner: 'Alex', createdAt: '2026-05-09T14:00:00.000Z', contactedAt: '2026-05-11T10:00:00.000Z' },
  { id: 'seed-046', name: 'Ursula Meier', company: 'BranchLogic', email: 'ursula@branchlogic.com', phone: '+49 1512345678', status: 'Meeting Scheduled', source: 'Website', value: 90000, owner: 'Priya', createdAt: '2026-05-11T10:00:00.000Z', contactedAt: '2026-05-13T11:00:00.000Z', meetingAt: '2026-05-16T15:00:00.000Z' },
  { id: 'seed-047', name: 'Vivek Nair', company: 'CoreXpert', email: 'vivek@corexpert.in', phone: '+91 9678901234', status: 'Won', source: 'Referral', value: 195000, owner: 'David', createdAt: '2026-05-13T09:00:00.000Z', contactedAt: '2026-05-15T11:00:00.000Z', meetingAt: '2026-05-18T15:00:00.000Z', proposalAt: '2026-05-21T10:00:00.000Z', wonAt: '2026-05-28T12:00:00.000Z' },
  { id: 'seed-048', name: 'Wanda Bell', company: 'SwiftStack', email: 'wanda@swiftstack.io', phone: '+1 (555) 234-5681', status: 'Contacted', source: 'Ads', value: 48000, owner: 'Sarah', createdAt: '2026-05-15T12:00:00.000Z', contactedAt: '2026-05-17T10:00:00.000Z' },
  { id: 'seed-049', name: 'Xavier Novak', company: 'CloudLeap', email: 'xavier@cloudleap.cz', phone: '+420 601234567', status: 'New', source: 'LinkedIn', value: 35000, owner: 'Alex', createdAt: '2026-05-17T10:00:00.000Z' },
  { id: 'seed-050', name: 'Yuki Tanaka', company: 'SkyBridge AI', email: 'yuki@skybridgeai.jp', phone: '+81 9023456789', status: 'Won', source: 'Email Campaign', value: 118000, owner: 'Priya', createdAt: '2026-05-19T14:00:00.000Z', contactedAt: '2026-05-21T11:00:00.000Z', meetingAt: '2026-05-24T15:00:00.000Z', proposalAt: '2026-05-27T10:00:00.000Z', wonAt: '2026-05-31T12:00:00.000Z' },

  // ── June 2026 (current month) ────────────────────────────────────────────
  { id: 'seed-051', name: 'Zara Okafor', company: 'FastClose', email: 'zara@fastclose.io', phone: '+234 8012345678', status: 'Won', source: 'LinkedIn', value: 130000, owner: 'David', createdAt: '2026-06-01T10:00:00.000Z', contactedAt: '2026-06-03T11:00:00.000Z', meetingAt: '2026-06-06T15:00:00.000Z', proposalAt: '2026-06-09T10:00:00.000Z', wonAt: '2026-06-17T12:00:00.000Z' },
  { id: 'seed-052', name: 'Aaron Mitchell', company: 'PipelineX', email: 'aaron@pipelinex.com', phone: '+1 (555) 345-6782', status: 'Proposal Sent', source: 'Referral', value: 145000, owner: 'Sarah', createdAt: '2026-06-03T14:00:00.000Z', contactedAt: '2026-06-05T11:00:00.000Z', meetingAt: '2026-06-08T15:00:00.000Z', proposalAt: '2026-06-11T10:00:00.000Z' },
  { id: 'seed-053', name: 'Beatrix Müller', company: 'ScaleHub', email: 'beatrix@scalehub.de', phone: '+49 1523456789', status: 'Won', source: 'Website', value: 88000, owner: 'Alex', createdAt: '2026-06-05T09:00:00.000Z', contactedAt: '2026-06-07T10:00:00.000Z', meetingAt: '2026-06-10T15:00:00.000Z', proposalAt: '2026-06-13T10:00:00.000Z', wonAt: '2026-06-19T12:00:00.000Z' },
  { id: 'seed-054', name: 'Carlos Rivera', company: 'TechBlaze', email: 'carlos@techblaze.mx', phone: '+52 5512345678', status: 'Meeting Scheduled', source: 'Instagram', value: 67000, owner: 'Priya', createdAt: '2026-06-07T11:00:00.000Z', contactedAt: '2026-06-09T11:00:00.000Z', meetingAt: '2026-06-12T15:00:00.000Z' },
  { id: 'seed-055', name: 'Diane Foster', company: 'NovaPilot', email: 'diane@novapilot.io', phone: '+1 (555) 456-7893', status: 'Contacted', source: 'Cold Call', value: 44000, owner: 'David', createdAt: '2026-06-09T14:00:00.000Z', contactedAt: '2026-06-11T10:00:00.000Z' },
  { id: 'seed-056', name: 'Edward Ng', company: 'UptimeCloud', email: 'edward@uptimecloud.sg', phone: '+65 91234567', status: 'New', source: 'LinkedIn', value: 77000, owner: 'Sarah', createdAt: '2026-06-11T10:00:00.000Z' },
  { id: 'seed-057', name: 'Fatima Hassan', company: 'BoostAI', email: 'fatima@boostai.ae', phone: '+971 501234567', status: 'Lost', source: 'Ads', value: 29000, owner: 'Alex', createdAt: '2026-06-12T09:00:00.000Z', contactedAt: '2026-06-14T10:00:00.000Z' },
  { id: 'seed-058', name: 'George Parker', company: 'FinScale', email: 'george@finscale.co', phone: '+44 7712345678', status: 'Won', source: 'Referral', value: 175000, owner: 'Priya', createdAt: '2026-06-13T11:00:00.000Z', contactedAt: '2026-06-15T11:00:00.000Z', meetingAt: '2026-06-16T15:00:00.000Z', proposalAt: '2026-06-17T10:00:00.000Z', wonAt: '2026-06-19T14:00:00.000Z' },
  { id: 'seed-059', name: 'Heidi Bauer', company: 'DataNova', email: 'heidi@datanova.at', phone: '+43 6601234567', status: 'Proposal Sent', source: 'Website', value: 93000, owner: 'David', createdAt: '2026-06-15T14:00:00.000Z', contactedAt: '2026-06-16T11:00:00.000Z', meetingAt: '2026-06-17T15:00:00.000Z', proposalAt: '2026-06-18T10:00:00.000Z' },
  { id: 'seed-060', name: 'Ivan Petrov', company: 'SpeedCRM', email: 'ivan@speedcrm.ru', phone: '+7 9123456789', status: 'New', source: 'LinkedIn', value: 51000, owner: 'Sarah', createdAt: '2026-06-17T10:00:00.000Z' },
];

const STORAGE_KEY = 'crm_leads';

/**
 * React Context for lead management state.
 * @type {import('react').Context<LeadContextValue|null>}
 */
export const LeadContext = createContext(null);

/**
 * Provides lead state and CRUD operations to the component tree.
 *
 * Initializes from localStorage if data exists, otherwise seeds with
 * default demo leads. All mutations are automatically persisted.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Child components
 * @returns {import('react').ReactElement} Provider wrapping children
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('LeadContext: Failed to parse saved leads:', e);
      }
    }
    return DEFAULT_LEADS;
  });

  /**
   * Persist leads to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  /**
   * Creates a new lead with an auto-generated ID and createdAt timestamp.
   *
   * @param {Omit<Lead, 'id'|'createdAt'>} formData - Lead fields from the form
   * @returns {Lead} The newly created lead object
   */
  const addLead = useCallback((formData) => {
    const newLead = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  }, []);

  /**
   * Updates an existing lead by merging partial updates into its current data.
   *
   * @param {string} id - The ID of the lead to update
   * @param {Partial<Lead>} updates - Fields to merge into the existing lead
   */
  const updateLead = useCallback((id, updates) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  }, []);

  /**
   * Permanently removes a lead from the list by ID.
   *
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = useCallback((id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, []);

  /**
   * Retrieves a single lead by its unique ID.
   *
   * @param {string} id - The ID to search for
   * @returns {Lead|undefined} The matching lead, or undefined if not found
   */
  const getLeadById = useCallback(
    (id) => leads.find((lead) => lead.id === id),
    [leads]
  );

  /** @type {LeadContextValue} */
  const value = { leads, addLead, updateLead, deleteLead, getLeadById };

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom hook to consume the LeadContext.
 * Throws a descriptive error if used outside of a `<LeadProvider>`.
 *
 * @returns {LeadContextValue} The lead context value
 * @throws {Error} If called outside of LeadProvider
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (context === null) {
    throw new Error(
      'useLeads() must be used within a <LeadProvider>. ' +
      'Wrap your component tree with <LeadProvider> in main.jsx or App.jsx.'
    );
  }
  return context;
}
