const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SDG = require('./models/SDG');
const Article = require('./models/Article');
const Quiz = require('./models/Quiz'); // Add this

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await SDG.deleteMany();
    await Article.deleteMany();
    await Quiz.deleteMany();

    // Create SDGs
        // Create SDGs (All 17)
    await SDG.create([
      { goalNumber: 1, title: 'No Poverty', shortDescription: 'End poverty in all its forms everywhere.', description: 'Eradicating poverty is not a task of charity, it is an act of justice.', category: 'Society', icon: '👐', color: '#E5243B' },
      { goalNumber: 2, title: 'Zero Hunger', shortDescription: 'End hunger, achieve food security and improved nutrition.', description: 'A profound change of the global food and agriculture system is needed.', category: 'Society', icon: '🌾', color: '#DDA63A' },
      { goalNumber: 3, title: 'Good Health', shortDescription: 'Ensure healthy lives and promote well-being for all.', description: 'Ensuring healthy lives and promoting well-being at all ages is essential to sustainable development.', category: 'Society', icon: '💊', color: '#4C9F38' },
      { goalNumber: 4, title: 'Quality Education', shortDescription: 'Ensure inclusive and equitable quality education.', description: 'Obtaining a quality education is the foundation to improving people’s lives.', category: 'Society', icon: '📚', color: '#C5192D' },
      { goalNumber: 5, title: 'Gender Equality', shortDescription: 'Achieve gender equality and empower all women.', description: 'Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous world.', category: 'Society', icon: '⚖️', color: '#FF3A21' },
      { goalNumber: 6, title: 'Clean Water', shortDescription: 'Ensure availability and sustainable management of water.', description: 'Water scarcity, poor water quality and inadequate sanitation negatively impact food security.', category: 'Environment', icon: '💧', color: '#26BDE2' },
      { goalNumber: 7, title: 'Affordable Energy', shortDescription: 'Ensure access to affordable, reliable, sustainable energy.', description: 'Energy is central to nearly every major challenge and opportunity.', category: 'Environment', icon: '⚡', color: '#FCC30B' },
      { goalNumber: 8, title: 'Decent Work', shortDescription: 'Promote sustained, inclusive economic growth.', description: 'Roughly half the world’s population still lives on the equivalent of about US$2 a day.', category: 'Economy', icon: '📈', color: '#A21942' },
      { goalNumber: 9, title: 'Innovation', shortDescription: 'Build resilient infrastructure, promote inclusive industrialization.', description: 'Technological progress is the foundation of efforts to achieve environmental objectives.', category: 'Economy', icon: '🏭', color: '#FD6925' },
      { goalNumber: 10, title: 'Reduced Inequalities', shortDescription: 'Reduce inequality within and among countries.', description: 'Income inequality is a global issue that requires global solutions.', category: 'Society', icon: '⚖️', color: '#DD1367' },
      { goalNumber: 11, title: 'Sustainable Cities', shortDescription: 'Make cities inclusive, safe, resilient and sustainable.', description: 'The world’s population is constantly increasing. To accommodate everyone, we need to build modern, sustainable cities.', category: 'Society', icon: '🏙️', color: '#FD9D24' },
      { goalNumber: 12, title: 'Responsible Consumption', shortDescription: 'Ensure sustainable consumption and production patterns.', description: 'Doing more and better with less.', category: 'Environment', icon: '♻️', color: '#BF8B2E' },
      { goalNumber: 13, title: 'Climate Action', shortDescription: 'Take urgent action to combat climate change.', description: 'Climate change is affecting every country on every continent.', category: 'Environment', icon: '🌡️', color: '#3F7E44' },
      { goalNumber: 14, title: 'Life Below Water', shortDescription: 'Conserve and sustainably use the oceans.', description: 'Careful management of this essential global resource is a key feature of a sustainable future.', category: 'Environment', icon: '🐟', color: '#0A97D9' },
      { goalNumber: 15, title: 'Life on Land', shortDescription: 'Protect, restore and promote sustainable use of terrestrial ecosystems.', description: 'Human life depends on the earth as much as the ocean for our sustenance and livelihoods.', category: 'Environment', icon: '🦁', color: '#56C02B' },
      { goalNumber: 16, title: 'Peace & Justice', shortDescription: 'Promote peaceful and inclusive societies.', description: 'Peace, stability, human rights and effective governance based on the rule of law are prerequisites for sustainable development.', category: 'Society', icon: '🕊️', color: '#00689D' },
      { goalNumber: 17, title: 'Partnerships', shortDescription: 'Strengthen the means of implementation and revitalize the global partnership.', description: 'A successful sustainable development agenda requires partnerships between governments, the private sector and civil society.', category: 'Economy', icon: '🤝', color: '#19486A' }
    ]);

    // Create Articles
        await Article.create([
      { title: 'How to Reduce Plastic Waste', slug: 'reduce-plastic', summary: 'Simple ways to reduce plastic usage in daily life.', content: `Plastic waste is a growing environmental problem that affects land, water, and wildlife. We can reduce it by avoiding single-use plastic bags, bottles, and packaging and choosing reusable alternatives such as cloth bags, steel bottles, and glass containers. Reusing items, recycling plastic properly, and buying products with less packaging can further minimize waste. By adopting these simple habits and encouraging others to do the same, we can protect the environment and build a cleaner, more sustainable future.`, category: 'Waste', coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=60' },
      { title: 'Understanding Carbon Footprint', slug: 'carbon-footprint', summary: 'What is a carbon footprint and how can you calculate yours?', content: `A carbon footprint is the total amount of greenhouse gases, especially carbon dioxide (CO₂), released into the atmosphere by a person, activity, or organization. Everyday activities such as using electricity, travelling by vehicles, and consuming certain foods contribute to our carbon footprint. Understanding it helps us recognize our environmental impact and make better choices. We can reduce our footprint by saving energy, using public transport, reducing waste, and choosing sustainable alternatives.`, category: 'Climate', coverImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500&q=60' },
      { title: 'Renewable Energy 101', slug: 'renewable-energy', summary: 'Learn about Solar, Wind, and Hydro power.', content: `Renewable energy comes from natural sources that are continuously replenished, such as sunlight, wind, water, and biomass. Unlike fossil fuels, these sources produce little or no greenhouse gas emissions during energy generation. Solar panels, wind turbines, and hydropower plants are common examples of renewable energy technologies. By adopting renewable energy, we can reduce pollution, conserve natural resources, and move toward a cleaner and more sustainable future.`, category: 'Energy', coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=500&q=60' },
      { title: 'Water Conservation Tips', slug: 'water-conservation', summary: 'Why water is precious and how to save it.', content: `Water, the most precious resource bestowed on us by nature, holds immense value in our lives. Since I joined Sehgal Foundation, an organization driven by a principle of “practice what we preach,” I have become more sensitive to water usage and conservation. A message I come across often is, “No matter how rich you are, you can’t live without water.” Since there is no substitute for water, what needs to be done to conserve this resource? A holistic view of water conservation examines the demand and the supply side of water management.`, category: 'Water', coverImage: 'https://images.unsplash.com/photo-1545897398-2aba891843b6?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { title: 'Sustainable Fashion', slug: 'sustainable-fashion', summary: 'How your clothes impact the planet.', content: `The clothing industry represents an important part of our economies, with a value of  USD 1.3 trillion and employing over 300 million people along the value chain (Ellen MacArthur Foundation). In the last 20 years, global fibre production has almost doubled from 58 million tonnes in 2000 to 116 million tonnes in 2022, and is expected to continue to grow to 147 million tonnes in 2030 if business as usual continues (Textile Exchange 2023). While people bought 60% more garments in 2014 than in 2000, they only kept the clothes for half as long (McKinsey & Company, 2016).`, category: 'Lifestyle', coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=60' }
    ]);
        await Quiz.create([
      // --- Quiz 1: Environmental Awareness (Original) ---
      {
        title: 'Environmental Awareness 101',
        description: 'Test your basic knowledge about the planet.',
        duration: 300,
        questions: [
          {
            questionText: 'Which of the following is a renewable energy source?',
            options: ['Coal', 'Natural Gas', 'Solar Energy', 'Petroleum'],
            correctAnswer: 2,
            explanation: 'Solar energy is renewable because it comes from sunlight.'
          },
          {
            questionText: 'What causes the Greenhouse Effect?',
            options: ['Solar Flares', 'Trapped Heat', 'Ocean Currents', 'Wind Patterns'],
            correctAnswer: 1,
            explanation: 'Greenhouse gases trap heat in the atmosphere.'
          },
          {
            questionText: 'Which SDG focuses on clean water?',
            options: ['SDG 6', 'SDG 13', 'SDG 7', 'SDG 3'],
            correctAnswer: 0,
            explanation: 'SDG 6 is Clean Water and Sanitation.'
          },
          {
            questionText: 'What is the best way to reduce plastic waste?',
            options: ['Burn it', 'Bury it', 'Reduce, Reuse, Recycle', 'Throw in ocean'],
            correctAnswer: 2,
            explanation: 'The 3 Rs help manage waste effectively.'
          },
          {
            questionText: 'Which gas is most responsible for global warming?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
            correctAnswer: 1,
            explanation: 'CO2 is the primary greenhouse gas.'
          }
        ]
      },

      // --- Quiz 2: Climate Action (New) ---
      {
        title: 'Climate Action Challenge',
        description: 'How much do you know about climate change?',
        duration: 300,
        questions: [
          {
            questionText: 'What is the main greenhouse gas emitted by human activities?',
            options: ['Oxygen', 'Carbon Dioxide (CO2)', 'Helium', 'Nitrogen'],
            correctAnswer: 1,
            explanation: 'CO2 is released by burning fossil fuels.'
          },
          {
            questionText: 'What is the goal of the Paris Agreement?',
            options: ['To ban all cars', 'To limit global warming to well below 2°C', 'To plant 1 billion trees', 'To stop using electricity'],
            correctAnswer: 1,
            explanation: 'The Paris Agreement aims to limit global temperature rise.'
          },
          {
            questionText: 'Which of these activities contributes most to your carbon footprint?',
            options: 'Eating meat',
            options: ['Driving a gasoline car', 'Reading a book', 'Planting a tree', 'Using a fan'],
            correctAnswer: 0,
            explanation: 'Transportation is a major contributor to individual carbon footprints.'
          },
          {
            questionText: 'What does "Carbon Neutral" mean?',
            options: ['Having no carbon', 'Balancing emitted carbon with carbon removal', 'Living in a forest', 'Stopping all industry'],
            correctAnswer: 1,
            explanation: 'It means offsetting emissions by removing an equivalent amount from the atmosphere.'
          },
          {
            questionText: 'Which sector emits the most greenhouse gases globally?',
            options: ['Agriculture', 'Energy (Electricity/Heat)', 'Waste', 'Tourism'],
            correctAnswer: 1,
            explanation: 'The energy sector, particularly burning coal and gas, is the largest emitter.'
          }
        ]
      },

      // --- Quiz 3: Waste Management (New) ---
      {
        title: 'Waste Management Warrior',
        description: 'Learn how to handle trash the right way.',
        duration: 240,
        questions: [
          {
            questionText: 'How long does a plastic bottle take to decompose?',
            options: ['10 years', '50 years', '450 years', '1000 years'],
            correctAnswer: 2,
            explanation: 'Plastic takes centuries to break down completely.'
          },
          {
            questionText: 'What are the 3 Rs of waste management?',
            options: ['Read, Rite, Review', 'Reduce, Reuse, Recycle', 'Run, Rest, Recreate', 'Rent, Return, Recycle'],
            correctAnswer: 1,
            explanation: 'Reduce consumption, Reuse items, and Recycle materials.'
          },
          {
            questionText: 'Which item should NOT go in a standard recycling bin?',
            options: ['Plastic bottle', 'Newspaper', 'Pizza box with grease', 'Aluminum can'],
            correctAnswer: 2,
            explanation: 'Grease contaminates paper recycling, so dirty pizza boxes usually go in trash/compost.'
          },
          {
            questionText: 'What is E-waste?',
            options: ['Waste from eating eggs', 'Electronic waste (old phones, computers)', 'Water waste', 'Expired food'],
            correctAnswer: 1,
            explanation: 'E-waste refers to discarded electrical or electronic devices.'
          },
          {
            questionText: 'What is composting?',
            options: ['Burning trash', 'Throwing trash in the ocean', 'Turning organic waste into fertilizer', 'Burying plastic'],
            correctAnswer: 2,
            explanation: 'Composting breaks down organic matter to create nutrient-rich soil.'
          }
        ]
      },

      // --- Quiz 4: Renewable Energy (New) ---
      {
        title: 'Renewable Energy Master',
        description: 'Test your knowledge on the future of energy.',
        duration: 300,
        questions: [
          {
            questionText: 'Which energy source relies on heat from the Earth?',
            options: ['Solar', 'Wind', 'Geothermal', 'Hydro'],
            correctAnswer: 2,
            explanation: 'Geothermal energy uses heat from under the earth\'s surface.'
          },
          {
            questionText: 'What is a disadvantage of Solar Energy?',
            options: ['It is renewable', 'It depends on sunlight (weather)', 'It creates no pollution', 'It is free'],
            correctAnswer: 1,
            explanation: 'Solar panels do not generate power at night or on very cloudy days without batteries.'
          },
          {
            questionText: 'What generates power from moving water?',
            options: ['Solar panel', 'Wind turbine', 'Hydroelectric dam', 'Nuclear reactor'],
            correctAnswer: 2,
            explanation: 'Hydroelectric dams use flowing water to spin turbines.'
          },
          {
            questionText: 'What fuel source creates radioactive waste?',
            options: ['Coal', 'Natural Gas', 'Nuclear', 'Wind'],
            correctAnswer: 2,
            explanation: 'Nuclear energy produces radioactive waste that must be carefully stored.'
          },
          {
            questionText: 'What is "Biomass"?',
            options: ['A measure of body mass', 'Energy from organic materials (plants, wood)', 'A type of plastic', 'Solar radiation'],
            correctAnswer: 1,
            explanation: 'Biomass energy comes from burning plant or animal waste.'
          }
        ]
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();