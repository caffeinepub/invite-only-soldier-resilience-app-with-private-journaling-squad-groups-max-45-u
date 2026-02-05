# Assessments Module Documentation

## Overview
The Assessments module provides offline-first, local-only personality and resilience assessments with gamified progression and mission unlocks.

## Module Flow
1. **Entry**: `/assessments` - Main assessments page listing all available assessments
2. **Run**: `/assessments/run/:assessmentId` - Interactive questionnaire for selected assessment
3. **Results**: `/assessments/results/:resultId` - Outcome display with briefing/scenario cards
4. **History**: `/assessments/history` - Historical results and trend analysis per assessment
5. **Leader View**: `/assessments/leader-view` - Squad leader guidance based on results

## Assessment Definitions
Location: `frontend/src/content/assessments.ts`

Each assessment includes:
- `id`: Unique identifier (AssessmentType: 'ocean' | 'mbti' | 'disc' | 'strengths' | 'gat')
- `title`: Display name
- `shortDescription`: Brief explanation
- `estimatedMinutes`: Time to complete
- `questions`: Array of questions with options
- `scoringType`: 'dimensional' | 'type' | 'band'

### Modifying Questions
To add/modify questions:
1. Add question object to `questions` array
2. Ensure each option has appropriate `scoreKey` and `value`
3. For dimensional scoring: use consistent scoreKeys (e.g., 'O', 'C', 'E', 'A', 'N' for OCEAN)
4. For type scoring: use dimension pairs (e.g., 'E'/'I', 'S'/'N' for MBTI)
5. For band scoring: use numeric values (1-5 scale)

## Scoring Logic
Location: `frontend/src/utils/assessmentScoring.ts`

### Placeholder Scoring Approaches
- **Dimensional** (OCEAN, DISC, Strengths): Sum scores per dimension, identify primary
- **Type** (MBTI): Count preferences per dimension pair, construct 4-letter type
- **Band** (GAT): Calculate percentage, map to outcome bands (high/moderate/building/developing)

### Modifying Scoring
To change scoring logic:
1. Update `scoreDimensional`, `scoreType`, or `scoreBand` functions
2. Ensure at least 3 distinct outcomes are possible
3. Update outcome labels in `getOceanLabel`, `getDISCLabel`, etc.

## Outcome Content
Location: `frontend/src/content/assessmentOutcomes.ts`

Each outcome includes:
- `whatItMeasures`: Brief explanation of the trait
- `relevance`: Connection to soldier performance/leadership/teamwork/resilience
- `insights`: Array of actionable insights (text/briefing/scenario types)

### Adding New Outcomes
1. Add entry to `OUTCOME_CONTENT` with key matching `outcomeId` from scoring
2. Include all three required sections
3. Add at least one interactive insight (scenario type with choices)

## Local Storage
Location: `frontend/src/hooks/useAssessments.ts`

Storage key: `dagger-assessments-{localUuid}`

Structure:
