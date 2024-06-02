const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          Hello, I'm Mohamed! 👋
        </h1>
        <p className="text-xl text-center text-gray-700">
          I'm a <strong className="text-gray-900">MERN stack developer</strong> who is
          passionate about Web3 and blockchain technology. 🚀 I love exploring new ideas
          and building innovative projects. My journey into the world of decentralized
          technologies has been thrilling, and I'm eager to dive deeper into blockchain
          development in the future. 🌐
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">About Me 😃</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>🌟 MERN Stack Developer</li>
            <li>🌉 Building the bridge between Web2 and Web3</li>
            <li>🔐 Enthusiastic about decentralized technologies</li>
            <li>📚 Constantly learning and growing</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">What I'm Working On 🛠️</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              <strong>Trading & Staking</strong> Developed bespoke trading and staking
              solutions tailored to meet specific client requirements
            </li>
            <li>
              <strong>Web3 Projects</strong> Exploring smart contracts, DeFi solutions,
              and blockchain integrations
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Get in Touch 📬</h2>
          <p className="text-lg text-gray-700">
            <a
              href="https://github.com/mohamed-Decentralized"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 👨‍💻
            </a>
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Fun Facts 🎉</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              🌍 I'm passionate about contributing to open-source projects and the
              developer community.
            </li>
            <li>
              📈 Always excited to learn about the latest trends in technology and
              blockchain.
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Skills 🛠️</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>
              <strong className="text-gray-900">Frontend:</strong> React.js, Next.js
            </li>
            <li>
              <strong className="text-gray-900">Backend:</strong> Node.js, Express.js
            </li>
            <li>
              <strong className="text-gray-900">Database:</strong> MongoDB
            </li>
            <li>
              <strong className="text-gray-900">Tools:</strong> Git, Visual Studio Code,
              Hardhat, Foundry
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">My Goals 🚀</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>🌐 Contribute to the decentralized web</li>
            <li>💡 Develop innovative blockchain solutions</li>
            <li>📈 Grow as a blockchain developer</li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Thanks for Stopping By! 😊</h2>
          <p className="text-lg text-gray-700">
            Feel free to explore my repositories and get in touch! 🌟
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
