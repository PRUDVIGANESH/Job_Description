
export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    mode: 'Remote' | 'Hybrid' | 'Onsite';
    experience: 'Fresher' | '0-1 Years' | '1-3 Years' | '3-5 Years';
    skills: string[];
    source: 'LinkedIn' | 'Naukri' | 'Indeed';
    postedDaysAgo: number;
    salaryRange: string;
    applyUrl: string;
    description: string;
}

const companies = [
    'Infosys', 'TCS', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant',
    'IBM', 'Oracle', 'SAP', 'Dell', 'Amazon', 'Flipkart', 'Swiggy',
    'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED',
    'Microsoft', 'Google', 'Urban Company', 'Zomato', 'Meesho', 'Groww',
    'Zerodha', 'Postman', 'BrowserStack', 'Chargebee'
];

const roles = [
    'SDE Intern', 'Graduate Engineer Trainee', 'Junior Backend Developer',
    'Frontend Intern', 'QA Intern', 'Data Analyst Intern',
    'Java Developer', 'Python Developer', 'React Developer', 'Full Stack Developer',
    'DevOps Engineer', 'Cloud Support Associate'
];

const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Mumbai', 'Remote'];

const skillsPool = [
    ['Java', 'Spring Boot', 'SQL'],
    ['Python', 'Django', 'React'],
    ['JavaScript', 'React', 'Node.js'],
    ['C++', 'Data Structures', 'Algorithms'],
    ['Manual Testing', 'Selenium', 'Java'],
    ['SQL', 'Python', 'Tableau'],
    ['AWS', 'Linux', 'Python'],
    ['HTML', 'CSS', 'JavaScript']
];

const descriptions = [
    "Join our dynamic team to build scalable web applications. You will work closely with senior developers to design and implement new features. Great opportunity for learning and growth.",
    "We are looking for a passionate developer to contribute to our core product. You should have a strong understanding of computer science fundamentals and be willing to learn new technologies.",
    "Exciting opportunity for freshers to kickstart their career in a fast-paced environment. You will be involved in the full software development lifecycle, from design to deployment.",
    "Work on cutting-edge technologies and solve complex problems. We value innovation and collaboration. Ideal for candidates with strong problem-solving skills.",
    "Be part of a high-performance team delivering world-class solutions. We offer a competitive salary and excellent benefits. Looking for self-motivated individuals."
];

const salaries = ["3-5 LPA", "6-10 LPA", "10-18 LPA", "₹15k-₹40k/month Internship", "4-7 LPA", "5-8 LPA"];

// Deterministically generate 60 jobs
export const jobs: Job[] = Array.from({ length: 60 }).map((_, i) => {
    const company = companies[i % companies.length];
    const role = roles[i % roles.length];
    const location = locations[i % locations.length];
    const mode = i % 5 === 0 ? 'Remote' : (i % 3 === 0 ? 'Hybrid' : 'Onsite');
    const experience = i % 4 === 0 ? 'Fresher' : (i % 4 === 1 ? '0-1 Years' : (i % 4 === 2 ? '1-3 Years' : '3-5 Years'));
    const skillSet = skillsPool[i % skillsPool.length];
    const source = i % 3 === 0 ? 'LinkedIn' : (i % 3 === 1 ? 'Naukri' : 'Indeed');
    const postedDaysAgo = i % 11;
    const salary = salaries[i % salaries.length];
    const description = descriptions[i % descriptions.length];

    return {
        id: `job-${i + 1}`,
        title: role,
        company: company,
        location: location,
        mode: mode,
        experience: experience,
        skills: skillSet,
        source: source,
        postedDaysAgo: postedDaysAgo,
        salaryRange: salary,
        applyUrl: `https://www.google.com/search?q=${encodeURIComponent(company + ' ' + role + ' careers')}`,
        description: description
    };
});
