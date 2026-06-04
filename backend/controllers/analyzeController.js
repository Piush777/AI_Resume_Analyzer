const analyzeResume = function(req, res){

    // 1. Validation
    if (!req.body.Skill || req.body.Skill.trim() === "") {
        return res.status(400).json({
            message: "Please enter resume text"
        });
    }

    // 2. Preprocessing
    const text = (req.body.Skill || "").toLowerCase();

    const skills = [];
    const suggestions = [];
    let role = "";

    // 3. Knowledge Base
    const roles = {
        frontend: ['javascript', 'react', 'html'],
        backend: ['node', 'express']
    };

    // 4. Role Detection
    let bestMatchCount = 0;
    let bestRole = "";

    for (let roleName in roles) {
        let matchCount = 0;

        roles[roleName].forEach((skill) => {
            if (text.includes(skill)) {
                matchCount++;
            }
        });

        if (matchCount > bestMatchCount) {
            bestMatchCount = matchCount;
            bestRole = roleName;

            if (bestRole === 'frontend') role = "Frontend Developer";
            else if (bestRole === 'backend') role = "Backend Developer";
        }
    }

    // 5. Skill Detection + Role-Based Suggestions
    if (bestRole) {
        const roleSkills = roles[bestRole];

        roleSkills.forEach((skill) => {
            const formattedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

            if (text.includes(skill)) {
                skills.push(formattedSkill);
            } else {
                suggestions.push(`Add ${formattedSkill} skill`);
            }
        });
    }

    // 6. Scoring
    const score = skills.length * 20;

    // 7. Response
    res.json({ skills, score, suggestions, role });
};

module.exports = analyzeResume;