const LEVEL_YOE: Record<string, [number, number]> = {
  'intern':    [0, 1],
  'entry':     [0, 2],
  'junior':    [1, 3],
  'mid':       [2, 5],
  'senior':    [4, 8],
  'staff':     [7, 12],
  'principal': [10, 20],
  'l3':        [0, 2],
  'l4':        [2, 5],
  'l5':        [4, 8],
  'l6':        [7, 12],
  'l7':        [10, 20],
  'e3':        [0, 2],
  'e4':        [2, 5],
  'e5':        [4, 8],
  'e6':        [7, 12],
  'sde-i':     [0, 2],
  'sde-ii':    [2, 5],
  'sde-iii':   [5, 9],
};

export function calculateFitScore(
  userSkills: string[],
  userYOE: number,
  userRoles: string[],
  jobTitle: string,
  jobDescription: string,
): number {
  const normalizedSkills = userSkills.map((s) => s.toLowerCase());
  const normalizedDesc = jobDescription.toLowerCase();
  const normalizedTitle = jobTitle.toLowerCase();

  // Skill match — 60%
  const matchedSkills = normalizedSkills.filter((skill) =>
    normalizedDesc.includes(skill)
  );
  const skillScore = Math.min(matchedSkills.length / Math.max(normalizedSkills.length * 0.4, 1), 1) * 60;

  // YOE match — 20%
  let yoeScore = 0;
  const levelKey = Object.keys(LEVEL_YOE).find((key) => normalizedTitle.includes(key));
  if (levelKey) {
    const [min, max] = LEVEL_YOE[levelKey];
    if (userYOE >= min && userYOE <= max) yoeScore = 20;
    else if (userYOE >= min - 1 && userYOE <= max + 1) yoeScore = 10;
  } else {
    yoeScore = 10; // neutral if level not detected
  }

  // Role match — 20%
  const roleScore = userRoles.some((role) =>
    normalizedTitle.includes(role.toLowerCase().split(' ')[0])
  ) ? 20 : 5;

  return Math.round(Math.min(skillScore + yoeScore + roleScore, 99));
}
