import { useState, useEffect } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { useMissionProgression } from './useMissionProgression';
import type { PersonalReport, CreateReportInput, UpdateReportInput } from '../types/personalReports';
import {
  getPersonalReports,
  addPersonalReport,
  updatePersonalReport as updateReportInStore,
  deletePersonalReport,
  submitPersonalReport,
  markReportXpGranted,
} from '../utils/localDataStore';

export function useLocalReports() {
  const { profile } = useLocalProfile();
  const { applyMissionResult } = useMissionProgression();
  const [reports, setReports] = useState<PersonalReport[]>([]);

  useEffect(() => {
    const loaded = getPersonalReports(profile.localUuid);
    setReports(loaded);
  }, [profile.localUuid]);

  const createReport = (input: CreateReportInput): PersonalReport => {
    const newReport = addPersonalReport(profile.localUuid, input);
    setReports((prev) => [...prev, newReport]);
    return newReport;
  };

  const updateReport = (reportId: string, updates: UpdateReportInput): void => {
    updateReportInStore(profile.localUuid, reportId, updates);
    const updated = getPersonalReports(profile.localUuid);
    setReports(updated);
  };

  const deleteReport = (reportId: string): void => {
    deletePersonalReport(profile.localUuid, reportId);
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  const submitReport = (reportId: string): void => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    submitPersonalReport(profile.localUuid, reportId);
    
    // Apply XP to mission progression system
    if (!report.xpGranted) {
      applyMissionResult({
        missionId: `report-${reportId}`,
        passed: true,
        score: report.xpAwarded,
        maxScore: report.xpAwarded,
        xpEarned: report.xpAwarded,
        sideQuestsCompleted: [],
        completedAt: Date.now(),
        choices: {},
      });
      markReportXpGranted(profile.localUuid, reportId);
    }

    const updated = getPersonalReports(profile.localUuid);
    setReports(updated);
  };

  return {
    reports,
    createReport,
    updateReport,
    deleteReport,
    submitReport,
  };
}
