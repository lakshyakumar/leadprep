import { useState } from 'react'

const P = [
  {
    icon: '🧹', title: 'Clean Code',
    summary: 'Functions do one thing. Meaningful names. No magic numbers. Comments explain WHY, not WHAT.',
    body: [
      ['Naming', 'Variables and functions must reveal intent. Avoid d, use daysSinceLastLogin. Code should read like prose, not a puzzle.'],
      ['Functions', 'One function = one task. If you need "and" to describe it, split it. Target under 20 lines.'],
      ['Comments', 'Explain WHY the code does something, not WHAT it does. The code tells you what — comments give context and reasoning behind decisions.'],
      ['No Magic Numbers', 'Replace if (status === 3) with if (status === STATUS.PENDING). Magic numbers are maintenance landmines.'],
      ['Boy Scout Rule', 'Always leave the campground cleaner than you found it. Rename a bad variable. Extract a long function. Delete dead code.'],
    ],
    links: [
      { label: 'Clean Code Summary', url: 'https://gist.github.com/wojteklu/73f42f8f0de65b2a46bc' },
      { label: 'Google Engineering Practices', url: 'https://google.github.io/eng-practices/' },
      { label: 'The Art of Readable Code', url: 'https://www.oreilly.com/library/view/the-art-of/9781449318482/' },
    ],
  },
  {
    icon: '🔷', title: 'SOLID Principles',
    summary: 'Single Responsibility · Open/Closed · Liskov · Interface Segregation · Dependency Inversion.',
    body: [
      ['S — Single Responsibility', 'A class has one reason to change. Your UserService should not also send emails and generate PDFs.'],
      ['O — Open/Closed', 'Open for extension, closed for modification. Add new behavior via new classes, not by editing existing ones.'],
      ['L — Liskov Substitution', 'Subclasses must be substitutable for their base class without breaking behavior.'],
      ['I — Interface Segregation', 'Many small, purpose-specific interfaces are better than one fat interface. Clients should not depend on methods they do not use.'],
      ['D — Dependency Inversion', 'High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).'],
    ],
    links: [
      { label: 'SOLID Explained with Examples', url: 'https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design' },
      { label: 'Uncle Bob: SOLID Relevance', url: 'https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html' },
      { label: 'SOLID in Pictures', url: 'https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898' },
    ],
  },
  {
    icon: '🔄', title: 'DRY / KISS / YAGNI',
    summary: "Don't Repeat Yourself · Keep It Simple · You Ain't Gonna Need It. The anti-over-engineering trio.",
    body: [
      ['DRY', 'Every piece of knowledge should have one representation. But: duplication is far cheaper than the wrong abstraction. Do not DRY too early.'],
      ['KISS', 'Complexity is the enemy of reliability. Resist the urge to be clever. Simple code is easier to read, test, debug, and change.'],
      ['YAGNI', 'Do not build features for problems you do not have yet. 80% of speculative generality is never used and adds maintenance cost.'],
      ['When to Break DRY', 'When two things look similar but represent different concepts. Premature DRY creates tight coupling between unrelated domains.'],
    ],
    links: [
      { label: 'The Wrong Abstraction (Sandi Metz)', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction' },
      { label: 'YAGNI by Martin Fowler', url: 'https://martinfowler.com/bliki/Yagni.html' },
    ],
  },
  {
    icon: '🧱', title: 'Modularity & Architecture',
    summary: 'High cohesion, low coupling. Separation of concerns. Layered arch. Dependency injection.',
    body: [
      ['High Cohesion', 'Things that change together belong together. A module should have one clear purpose.'],
      ['Low Coupling', 'Modules should know as little as possible about each other. Depend on interfaces, not implementations.'],
      ['Layered Architecture', 'Controller (HTTP) → Service (business logic) → Repository (data). Each layer only talks to the layer below.'],
      ['Dependency Injection', 'Receive dependencies from outside instead of instantiating them internally. This makes testing trivial and dependencies explicit.'],
      ['Separation of Concerns', 'Keep UI, business logic, and data access separate. Do not query the database from your controller.'],
    ],
    links: [
      { label: 'Hexagonal Architecture', url: 'https://alistair.cockburn.us/hexagonal-architecture/' },
      { label: 'Clean Architecture (Uncle Bob)', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html' },
      { label: 'Enterprise Architecture Patterns', url: 'https://martinfowler.com/eaaCatalog/' },
    ],
  },
  {
    icon: '⚠️', title: 'Error Handling',
    summary: 'Fail fast, fail clearly. Never swallow errors. Wrap with context. Distinguish error types.',
    body: [
      ['Fail Fast', 'Validate inputs at the boundary. Do not let invalid data propagate deep into the system before failing.'],
      ['Never Swallow Errors', 'An empty catch block is almost always wrong. At minimum, log. Better: handle or rethrow with added context.'],
      ['Wrap with Context', 'When propagating errors, add context about what you were doing. "failed to charge card: card expired" is debuggable.'],
      ['Error Types', 'Operational errors (network down, DB timeout) = handle gracefully. Programmer errors (null deref) = crash fast so bugs are found immediately.'],
      ['Error Contracts', 'Document what errors your functions can return. Use typed/custom error classes for structured handling by callers.'],
    ],
    links: [
      { label: 'Railway-Oriented Programming', url: 'https://fsharpforfunandprofit.com/rop/' },
      { label: 'Writing Better Error Messages', url: 'https://wix-ux.com/when-life-gives-you-lemons-write-better-error-messages-46c5223e1a2e' },
    ],
  },
  {
    icon: '🧪', title: 'Testing Strategy',
    summary: 'Unit + integration + e2e pyramid. TDD mindset. Tests as documentation. Mock external deps only.',
    body: [
      ['Test Pyramid', 'Many unit tests (fast) → fewer integration tests (test boundaries) → fewest e2e tests (slow). Do not invert the pyramid.'],
      ['TDD Mindset', 'Write the test first, make it pass, then refactor. Forces testable interface design. Red → Green → Refactor.'],
      ['Tests as Documentation', 'A test describes expected behavior. Use descriptive names: "should return 404 when user not found".'],
      ['Mock Sparingly', 'Mock network calls, DBs, clocks only. Do not mock your own classes — that is testing your mocks, not your code.'],
      ['Coverage is a Lagging Indicator', '90% coverage with bad tests is worse than 60% with good ones. Measure branch coverage, not just line coverage.'],
    ],
    links: [
      { label: 'The Practical Test Pyramid', url: 'https://martinfowler.com/articles/practical-test-pyramid.html' },
      { label: 'Testing Trophy (Kent C. Dodds)', url: 'https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications' },
    ],
  },
  {
    icon: '🔍', title: 'Code Reviews',
    summary: 'Review for correctness, readability, security, performance, tests. Be kind and specific. Keep PRs small.',
    body: [
      ['What to Review', 'Correctness, Readability, Security, Performance, Test coverage — in that order of importance.'],
      ['Tone', 'Critique the code, not the person. Ask questions rather than making demands. Suggest, do not dictate.'],
      ['Keep PRs Small', 'PRs under 400 lines get real reviews. PRs over 1000 lines get rubber-stamped. Small PRs ship faster with fewer bugs.'],
      ['Approve Good Enough', 'Do not let perfect be the enemy of shipped. If it is correct, readable, and tested — approve and file follow-up tickets.'],
      ['Author Responsibilities', 'Write a PR description. Link to the ticket. Explain non-obvious decisions. Make the reviewer\'s job easy.'],
    ],
    links: [
      { label: 'Google Code Review Guide', url: 'https://google.github.io/eng-practices/review/' },
      { label: 'How to Make Your Reviewer Love You', url: 'https://mtlynch.io/code-review-love/' },
    ],
  },
  {
    icon: '🌐', title: 'API Design',
    summary: 'Resource-based URLs. Proper HTTP verbs and status codes. Versioning. Idempotency. Clear error contracts.',
    body: [
      ['Resource-Based URLs', 'Use /users/{id}/orders, not /getUserOrders?userId=123. Nouns in URLs, verbs from HTTP methods.'],
      ['HTTP Verbs + Status Codes', 'GET (read), POST (create), PUT (full replace), PATCH (partial), DELETE. 200/201/204/400/401/403/404/409/422/500.'],
      ['Versioning', 'URL versioning (/v1/) for public APIs. Never break existing clients — add, never remove.'],
      ['Idempotency', 'GET, PUT, DELETE must be idempotent. For POST, use idempotency keys. Test by calling twice with same result.'],
      ['Error Contracts', 'Return structured: { error: "INVALID_INPUT", message: "...", field: "email" }. Document all error codes.'],
    ],
    links: [
      { label: 'API Design Guide (Google)', url: 'https://cloud.google.com/apis/design' },
      { label: 'REST API Best Practices', url: 'https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api' },
      { label: 'HTTP Status Codes (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
    ],
  },
  {
    icon: '🔐', title: 'Secure Coding',
    summary: 'Input validation. Parameterized queries. Least privilege. Secrets in env vars. OWASP Top 10.',
    body: [
      ['Input Validation', 'Validate at the boundary. Never trust user input. Use allowlists over denylists.'],
      ['Injection Prevention', 'Use parameterized queries or ORMs. Never concatenate user input into SQL, shell commands, or HTML.'],
      ['Secrets Management', 'Never hardcode secrets. Use env vars locally, a secrets manager in production. Rotate regularly.'],
      ['Least Privilege', 'Every service and user account needs only the minimum permissions required. Revoke immediately when done.'],
      ['Dependency Auditing', 'Run npm audit, pip audit, or cargo audit in CI. Block PRs with critical CVEs. Pin dependency versions.'],
    ],
    links: [
      { label: 'OWASP Top 10', url: 'https://owasp.org/Top10/' },
      { label: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/' },
    ],
  },
  {
    icon: '📊', title: 'Observability',
    summary: 'Structured logs. Distributed tracing. RED metrics. Dashboards. Alerts. Runbooks.',
    body: [
      ['Three Pillars', 'Logs (what happened), Metrics (how much/fast), Traces (where time was spent). You need all three in production.'],
      ['Structured Logging', 'Log JSON with: timestamp, service, trace ID, request ID, level. Never log PII.'],
      ['Key Metrics (RED)', 'Rate (req/s), Errors (error rate), Duration (latency p50/p95/p99). For resources: Utilization, Saturation, Errors (USE).'],
      ['Distributed Tracing', 'Every request gets a trace ID. Propagate via HTTP headers. Visualize in Jaeger/Tempo. Find slow spans instantly.'],
      ['Runbooks', 'Every alert must have a runbook: what does it mean, who to wake up, first 5 things to check.'],
    ],
    links: [
      { label: 'Google SRE: Monitoring', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
      { label: 'OpenTelemetry Docs', url: 'https://opentelemetry.io/docs/' },
    ],
  },
  {
    icon: '🌿', title: 'Git & PR Hygiene',
    summary: 'Atomic commits. Conventional commit messages. Short-lived branches. Trunk-based development.',
    body: [
      ['Atomic Commits', 'One logical change per commit. Not "WIP". A commit should be a complete, working unit of change.'],
      ['Conventional Commits', 'feat(auth): add OAuth2 PKCE flow / fix(api): return 422 for invalid email. Enables automated changelogs.'],
      ['Short-Lived Branches', 'Feature branches should live less than 2 days. Long branches become integration nightmares. Use feature flags instead.'],
      ['Trunk-Based Dev', 'Everyone merges to main daily. Feature flags hide unfinished work. Continuous integration means continuously integrating.'],
    ],
    links: [
      { label: 'Conventional Commits Spec', url: 'https://www.conventionalcommits.org/' },
      { label: 'Trunk Based Development', url: 'https://trunkbaseddevelopment.com/' },
    ],
  },
  {
    icon: '🔁', title: 'Refactoring',
    summary: "Leave code better than you found it. Small safe steps. Never refactor and add features simultaneously.",
    body: [
      ['Boy Scout Rule', 'Every time you touch a file, leave it slightly better. Rename a confusing variable. Extract a long function. Delete dead code.'],
      ['Small Safe Steps', 'Refactor in tiny steps. Each step should keep the tests passing. Do not rewrite — restructure.'],
      ['Keep Behavior Intact', 'Refactoring = same behavior, better code. Adding features = different behavior. Mixing creates impossible-to-verify changes.'],
      ['When to Refactor', 'Before adding a feature (make room). After the third similar change (Rule of Three). When readability blocks code review.'],
    ],
    links: [
      { label: 'Refactoring Catalog (Fowler)', url: 'https://refactoring.com/catalog/' },
      { label: 'Working Effectively with Legacy Code', url: 'https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052' },
    ],
  },
]

const LANGS = [
  {
    id: 'js', label: 'JavaScript', icon: '🟨',
    docs: [
      { label: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
      { label: 'JavaScript.info', url: 'https://javascript.info' },
      { label: 'You Don\'t Know JS (free)', url: 'https://github.com/getify/You-Dont-Know-JS' },
      { label: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices' },
    ],
    sections: [
      { title: 'Core Language', body: 'Prefer const/let over var. Use strict equality (===). Avoid implicit coercion. Master optional chaining (?.) and nullish coalescing (??).' },
      { title: 'Async Patterns', body: 'Prefer async/await over raw Promise chains. Always handle rejections. Use Promise.all for parallel ops. Never use async in forEach — use for...of or map + Promise.all.' },
      { title: 'Functional Style', body: 'Prefer map/filter/reduce for readability. Avoid mutation. Use spread for shallow copies. But do not sacrifice clarity for cleverness.' },
      { title: 'Common Pitfalls', body: 'Closure in loops (use let). this binding in callbacks (use arrow functions). Floating point arithmetic. Event loop blocking. Memory leaks from listeners not removed.' },
      { title: 'Performance', body: 'Debounce/throttle UI events. Avoid DOM manipulation in loops. Use WeakMap/WeakSet for cache. Profile with Chrome DevTools Performance tab.' },
    ],
  },
  {
    id: 'ts', label: 'TypeScript', icon: '🔷',
    docs: [
      { label: 'TypeScript Official Docs', url: 'https://www.typescriptlang.org/docs/' },
      { label: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/' },
      { label: 'Total TypeScript (Matt Pocock)', url: 'https://totaltypescript.com' },
      { label: 'Type Challenges (practice)', url: 'https://github.com/type-challenges/type-challenges' },
    ],
    sections: [
      { title: 'Strict Mode', body: 'Always enable strict: true in tsconfig. It enables strictNullChecks, noImplicitAny, and more. Treat any as a code smell — use unknown for truly unknown data.' },
      { title: 'Interface vs Type', body: 'Use interface for object shapes (supports declaration merging). Use type for unions, intersections, and mapped types. Know when each applies.' },
      { title: 'Generics', body: 'Use generics for reusable functions and types. Add constraints (T extends object). Do not over-generalize — generics are tools, not a goal.' },
      { title: 'Utility Types', body: 'Master Partial, Required, Readonly, Pick, Omit, Record, Extract, Exclude, ReturnType, Parameters. Implement them from scratch to understand mapped types.' },
      { title: 'Advanced', body: 'Conditional types with infer. Template literal types for string typing. Module augmentation for extending third-party types. Branded types for nominal typing.' },
    ],
  },
  {
    id: 'python', label: 'Python', icon: '🐍',
    docs: [
      { label: 'Python Official Docs', url: 'https://docs.python.org/3/' },
      { label: 'Real Python Tutorials', url: 'https://realpython.com' },
      { label: 'Effective Python', url: 'https://effectivepython.com' },
      { label: 'Python Design Patterns', url: 'https://python-patterns.guide' },
    ],
    sections: [
      { title: 'Pythonic Style', body: 'Use list/dict/set comprehensions over loops. Prefer enumerate() over range(len()). Use zip() for parallel iteration. Unpack tuples explicitly.' },
      { title: 'Type Hints', body: 'Annotate all function signatures with type hints. Use Optional[X] or X | None. Run mypy or pyright in CI to catch type errors before runtime.' },
      { title: 'Error Handling', body: 'Use specific exceptions, not bare except. Prefer EAFP (try/except) over LBYL (if/check). Use context managers (with) for all resource cleanup.' },
      { title: 'Performance', body: 'Use generators for large datasets to avoid loading all into memory. Profile with cProfile. Use functools.lru_cache for memoization. Pandas for bulk transforms.' },
      { title: 'Async (asyncio)', body: 'Use async/await for I/O bound tasks. Use asyncio.gather() for concurrent coroutines. Never use time.sleep() in async code — use asyncio.sleep(). Use httpx over requests for async HTTP.' },
    ],
  },
  {
    id: 'go', label: 'Golang', icon: '🔵',
    docs: [
      { label: 'Go Official Docs', url: 'https://go.dev/doc/' },
      { label: 'Effective Go', url: 'https://go.dev/doc/effective_go' },
      { label: 'Go by Example', url: 'https://gobyexample.com' },
      { label: 'Go Proverbs', url: 'https://go-proverbs.github.io' },
    ],
    sections: [
      { title: 'Error Handling', body: 'Return errors as values. Wrap with fmt.Errorf("context: %w", err). Check errors immediately after every call. Never ignore errors with _. Use errors.Is/errors.As for type-safe checking.' },
      { title: 'Interfaces', body: 'Keep interfaces small (1-3 methods). Define them at the consumer side, not the producer. Use io.Reader and io.Writer as composition models. Composition over inheritance.' },
      { title: 'Concurrency', body: 'Do not communicate by sharing memory — share memory by communicating. Use channels for coordination, mutexes for state. Use context.Context for cancellation and deadlines.' },
      { title: 'Goroutines', body: 'Never leak goroutines — always provide a way to stop them. Use sync.WaitGroup for fan-out. Use errgroup for goroutines returning errors. Always close channels from the sender.' },
      { title: 'Performance', body: 'Pre-allocate slices: make([]T, 0, n). Use strings.Builder over concatenation in loops. Use sync.Pool for high-frequency allocations. Profile with pprof in production.' },
    ],
  },
  {
    id: 'rust', label: 'Rust', icon: '🦀',
    docs: [
      { label: 'The Rust Book (free)', url: 'https://doc.rust-lang.org/book/' },
      { label: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/' },
      { label: 'Rustlings (exercises)', url: 'https://github.com/rust-lang/rustlings' },
      { label: 'Async Rust Book', url: 'https://rust-lang.github.io/async-book/' },
    ],
    sections: [
      { title: 'Ownership & Borrowing', body: 'Every value has one owner. References borrow without taking ownership. Only one mutable reference OR many immutable at a time. The borrow checker enforces this at compile time — no runtime cost.' },
      { title: 'Error Handling', body: 'Use Result<T,E> for recoverable errors. Use panic! only for unrecoverable programmer errors. Use the ? operator to propagate. Use thiserror for library errors, anyhow for application errors.' },
      { title: 'Traits', body: 'Traits are Rust interfaces. Implement std traits: Display, Debug, From, Into, Iterator, Clone. Use trait objects (Box<dyn Trait>) for runtime polymorphism. Prefer generics for static dispatch performance.' },
      { title: 'Lifetimes', body: 'Lifetimes ensure references do not outlive what they borrow. Most are inferred by the compiler. Explicit lifetimes are needed when functions return references tied to inputs.' },
      { title: 'Async/Await', body: 'Async functions return Future — they are lazy until polled. Use tokio or async-std as the runtime executor. Use tokio::spawn for concurrent tasks. Never call blocking code in an async context.' },
    ],
  },
  {
    id: 'solidity', label: 'Solidity', icon: '💎',
    docs: [
      { label: 'Solidity Docs', url: 'https://docs.soliditylang.org/' },
      { label: 'Solidity by Example', url: 'https://solidity-by-example.org/' },
      { label: 'Smart Contract Best Practices', url: 'https://consensys.github.io/smart-contract-best-practices/' },
      { label: 'Ethernaut (Security)', url: 'https://ethernaut.openzeppelin.com/' },
    ],
    sections: [
      { title: 'Security First', body: 'Smart contracts handle money and cannot be easily patched. Exploit costs are catastrophic. Always use Checks-Effects-Interactions (CEI) to prevent reentrancy. Pull over push payments.' },
      { title: 'Gas Optimization', body: 'Storage (SSTORE) is the most expensive operation. Pack variables in structs. Use memory/calldata instead of storage where possible. Cache state variables in memory for loops.' },
      { title: 'Upgradeability', body: 'Contracts are immutable by default. Use Proxy patterns (UUPS or Transparent) via OpenZeppelin if business logic must change. Beware of storage collisions when upgrading.' },
      { title: 'Access Control', body: 'Never leave state-mutating functions public without auth. Use OpenZeppelin Ownable for simple admin rights, or AccessControl for role-based permissions.' },
      { title: 'Testing (Foundry)', body: 'Unit test 100% of branches. Write invariant tests (properties that must always hold true, e.g., Total Supply == Sum of Balances) and fuzz tests to catch edge cases.' },
    ],
  },
]

const OPS = [
  {
    icon: '📏', title: 'Engineering Metrics (DORA)',
    summary: 'Deployment Frequency · Lead Time · Change Failure Rate · MTTR. Know your baseline.',
    body: [
      ['Deployment Frequency', 'How often you ship to production. Elite teams deploy multiple times per day. Measure to drive improvement.'],
      ['Lead Time for Changes', 'Time from commit to production. Elite < 1 hour. High < 1 day. Medium < 1 week. Bottleneck is almost always review or testing.'],
      ['Change Failure Rate', '% of deploys causing incidents. Elite < 5%. This measures quality, not just speed. Invest in tests and code review.'],
      ['Mean Time to Recovery', 'How quickly you recover from failures. Elite < 1 hour. Invest in runbooks, on-call training, and rollback automation.'],
    ],
    links: [
      { label: 'DORA State of DevOps Report', url: 'https://dora.dev/research/' },
      { label: 'Accelerate (book)', url: 'https://itrevolution.com/book/accelerate/' },
    ],
  },
  {
    icon: '🚨', title: 'Incident Management',
    summary: 'P0-P3 severity tiers. Incident commander. Blameless post-mortems. 5 Whys. Action items.',
    body: [
      ['Severity Tiers', 'P0 (all users down), P1 (major feature broken), P2 (degraded), P3 (minor). Define escalation criteria for each.'],
      ['Incident Commander', 'One person owns coordination — not fixing. Engineers fix; IC communicates status to stakeholders and coordinates.'],
      ['Blameless Post-Mortems', 'Focus on systems, not blame. "The deploy process allowed this" not "John broke prod." Root cause is always systemic.'],
      ['5 Whys', 'Ask "why" 5 times to find root cause, not just trigger. The 5th why is usually a process or tooling gap.'],
    ],
    links: [
      { label: 'Google SRE: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/' },
      { label: 'PagerDuty Incident Response Guide', url: 'https://response.pagerduty.com/' },
    ],
  },
  {
    icon: '🔧', title: 'CI/CD Pipeline',
    summary: 'Fast builds. Tests gate merges. Canary/blue-green deploys. Rollback. Feature flags.',
    body: [
      ['Fast Builds', 'Target < 10 min total. Cache dependencies and build artifacts. Run unit tests first (fast feedback), e2e after.'],
      ['Quality Gates', 'Tests must pass to merge. Add security scanning (SAST, dep audit). Block on critical issues immediately.'],
      ['Deployment Strategies', 'Canary (5% traffic to new version), Blue-Green (all traffic switch), Rolling (replace instances gradually).'],
      ['Feature Flags', 'Deploy code without activating features. Enable for internal users first, then % rollout. Instant kill switch.'],
    ],
    links: [
      { label: 'Continuous Delivery (Jez Humble)', url: 'https://continuousdelivery.com/' },
      { label: 'Feature Flags Best Practices', url: 'https://launchdarkly.com/blog/feature-flag-best-practices/' },
    ],
  },
  {
    icon: '🏗️', title: 'Infrastructure as Code',
    summary: 'Terraform/Pulumi. Environments as code. Immutable infra. GitOps. No manual console changes.',
    body: [
      ['IaC Principles', 'Infrastructure should be versioned, tested, and peer-reviewed like code. No manual console changes in production.'],
      ['Immutable Infrastructure', 'Replace, do not update. Build a new image and swap it. Eliminates configuration drift and snowflake servers.'],
      ['GitOps', 'Git is the single source of truth for both app code and infrastructure state. Changes via PRs, not CLI commands.'],
      ['Drift Detection', 'Periodically compare actual infrastructure against declared state. Terraform plan in CI shows every change.'],
    ],
    links: [
      { label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
      { label: 'GitOps Principles', url: 'https://opengitops.dev/' },
    ],
  },
  {
    icon: '🛡️', title: 'Security Posture',
    summary: 'Threat modeling. Dep scanning. Secret scanning in CI. RBAC. Audit logs. SOC 2 awareness.',
    body: [
      ['Shift Left', 'Find vulnerabilities during development, not in production. SAST in IDE + CI. Dep scanning on every PR.'],
      ['RBAC', 'Role-Based Access Control. Principle of least privilege for every user, service, and CI system. Audit access quarterly.'],
      ['Audit Logs', 'Log every privileged action: who, what, when, from where. Immutable. Required for SOC 2, ISO 27001.'],
      ['SOC 2', 'Trust Services Criteria: Security, Availability, Confidentiality. Know what your company\'s compliance posture is.'],
    ],
    links: [
      { label: 'OWASP Developer Guide', url: 'https://owasp.org/www-project-developer-guide/' },
      { label: 'SOC 2 Overview', url: 'https://www.vanta.com/resources/soc-2-compliance-checklist' },
    ],
  },
  {
    icon: '📚', title: 'Documentation',
    summary: 'ADRs for key decisions. README-driven dev. Runbooks. API docs. Onboarding guides.',
    body: [
      ['ADRs', 'Architecture Decision Records: short docs capturing context, decision, and consequences. Never delete — mark old ones as "superseded."'],
      ['README-Driven Development', 'Write the README before the code. If you cannot explain it clearly, the design needs work.'],
      ['Runbooks', 'Step-by-step guides for ops procedures. Must be runnable at 3am by someone half-awake. Keep them short and tested.'],
      ['API Documentation', 'OpenAPI/Swagger for REST. Generated docs stay in sync with code. Always include request/response examples.'],
    ],
    links: [
      { label: 'ADR GitHub Examples', url: 'https://github.com/joelparkerhenderson/architecture-decision-record' },
      { label: 'Divio Documentation System', url: 'https://documentation.divio.com/' },
    ],
  },
]

function Tile({ p }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`std-card${open ? ' std-open' : ''}`} onClick={() => setOpen(v => !v)}>
      <div className="std-card-header">
        <span className="std-card-icon">{p.icon}</span>
        <div className="std-card-meta">
          <div className="std-card-title">{p.title}</div>
          <div className="std-card-summary">{p.summary}</div>
        </div>
        <span className="std-card-chevron">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="std-card-body" onClick={e => e.stopPropagation()}>
          <div className="std-card-detail">
            {p.body.map(([b, t]) => (
              <p key={b}><strong>{b}:</strong> {t}</p>
            ))}
          </div>
          <div className="std-card-links">
            <div className="std-links-label">📖 Learn More</div>
            <div className="std-links-list">
              {p.links.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="std-link" onClick={e => e.stopPropagation()}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Standards() {
  const [tab, setTab] = useState('principles')
  const lang = LANGS.find(l => l.id === tab)

  return (
    <div>
      <div className="section-title">Engineering Best Practices</div>
      <div className="section-subtitle">Click any card to expand — includes detail and links to learn more</div>

      <div className="std-tab-bar">
        <button className={`tab-btn${tab === 'principles' ? ' active' : ''}`} onClick={() => setTab('principles')}>⚡ Principles</button>
        {LANGS.map(l => (
          <button key={l.id} className={`tab-btn${tab === l.id ? ' active' : ''}`} onClick={() => setTab(l.id)}>
            {l.icon} {l.label}
          </button>
        ))}
        <button className={`tab-btn${tab === 'ops' ? ' active' : ''}`} onClick={() => setTab('ops')}>⚙️ Ops & Process</button>
      </div>

      {tab === 'principles' && (
        <div className="std-grid">{P.map(p => <Tile key={p.title} p={p} />)}</div>
      )}

      {lang && (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {lang.docs.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="std-link-pill">
                {l.label} ↗
              </a>
            ))}
          </div>
          {lang.sections.map(s => (
            <div key={s.title} className="lang-section">
              <div className="lang-section-title">{s.title}</div>
              <div className="lang-section-body">{s.body}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'ops' && (
        <div className="std-grid">{OPS.map(p => <Tile key={p.title} p={p} />)}</div>
      )}
    </div>
  )
}
