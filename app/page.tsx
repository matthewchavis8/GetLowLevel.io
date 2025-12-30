import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold">GetLowLevel.io</div>
          <div className="flex items-center gap-8">
            <a href="#topics" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400">Topics</a>
            <a href="#practice" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400">Practice</a>
            <a href="#pricing" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400">Pricing</a>
            <button className="rounded-full bg-black px-6 py-2 text-sm text-white dark:bg-white dark:text-black">
              Get started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Master low-level programming concepts
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
            Build a deep understanding of computer systems, operating systems, and performance-critical programming. 
            Practice hundreds of questions covering the fundamentals that matter.
          </p>
          <button className="mt-8 rounded-full bg-black px-8 py-3 text-base font-medium text-white dark:bg-white dark:text-black">
            Start learning for free
          </button>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Why GetLowLevel.io?</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              In the age of AI, deep systems knowledge will be the differentiator. 
              Stand out from the competition!
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="rounded-full bg-red-100 px-6 py-3 text-red-700 dark:bg-red-900/30 dark:text-red-300">
              Operating Systems
            </div>
            <div className="rounded-full bg-cyan-100 px-6 py-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
              Networking
            </div>
            <div className="rounded-full bg-pink-100 px-6 py-3 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
              Memory Management
            </div>
            <div className="rounded-full bg-purple-100 px-6 py-3 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              Computer Architecture
            </div>
            <div className="rounded-full bg-green-100 px-6 py-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Concurrency
            </div>
            <div className="rounded-full bg-orange-100 px-6 py-3 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              System Design
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-black">
              <h3 className="text-xl font-semibold">Deep Fundamentals</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Go beyond surface-level knowledge. Understand how systems really work under the hood.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-black">
              <h3 className="text-xl font-semibold">Real Interview Questions</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Practice questions from actual technical interviews at top tech companies and trading firms.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-black">
              <h3 className="text-xl font-semibold">Performance Focused</h3>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Learn to write fast, efficient code and understand the performance implications of your decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section id="practice" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Practice in your language</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Real systems programming problems. Master the concepts that interviewers actually ask.
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            {/* Python */}
            <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:scale-105 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <Image src="/PythonLogo.png" alt="PythonLogo" width={64} height={64} className="object-contain" />
              <div className="mt-4 font-semibold">Python</div>
            </div>

            {/* C++ */}
            <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:scale-105 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <Image src="/C++Logo.png" alt="C++" width={64} height={64} className="object-contain" />
              <div className="mt-4 font-semibold">C++</div>
            </div>

            {/* Rust */}
            <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:scale-105 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <Image src="/RustLogo.png" alt="Rust" width={64} height={64} className="object-contain" />
              <div className="mt-4 font-semibold">Rust</div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold">Sample Question: Cache Line Behavior</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  What is the cache line size on most modern x86-64 processors, and why does false sharing occur when multiple threads write to different variables on the same cache line?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">How we compare</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              See what makes GetLowLevel.io different from other platforms.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-500">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">GetLowLevel.io</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-400">LeetCode</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-400">HackerRank</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-6 py-4 text-sm">Operating Systems</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-6 py-4 text-sm">Computer Architecture</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-6 py-4 text-sm">Concurrency & Threading</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-6 py-4 text-sm">Systems Programming</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                  <td className="px-6 py-4 text-center text-red-600">✗</td>
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-6 py-4 text-sm">Data Structures & Algorithms</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm">Free Forever</td>
                  <td className="px-6 py-4 text-center text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-orange-600">Partial</td>
                  <td className="px-6 py-4 text-center text-orange-600">Partial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Pricing</h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Complete access to all content, forever free.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-md rounded-2xl border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 p-8 dark:from-purple-950/20 dark:to-pink-950/20">
              <div className="text-center">
                <div className="inline-block rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white">
                  Forever Free
                </div>
                <div className="mt-6 text-6xl font-bold">$0</div>
                <div className="mt-2 text-zinc-600 dark:text-zinc-400">No credit card required</div>
              </div>

              <button className="mt-8 w-full rounded-full bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700">
                Get started now
              </button>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Unlimited access to all questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Operating systems deep dives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Computer architecture concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Concurrency and threading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Performance optimization techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Community support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold">GetLowLevel.io</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Master the low-level concepts that matter.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">About</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Contact</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Terms</a>
              <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Privacy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-zinc-500">
            © 2025 GetLowLevel.io. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
