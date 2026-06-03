def upsert_course(title:, description:, status:)
  course = Course.find_or_initialize_by(title: title)
  course.description = description
  course.status = status
  course.save!
  course
end

def upsert_learner(name:, email:, password: 'password123')
  learner = Learner.find_or_initialize_by(email: email)
  learner.name = name
  learner.password = password
  learner.password_confirmation = password
  learner.save!
  learner
end

def upsert_response(learner:, course:, content:)
  response = Response.find_or_initialize_by(learner: learner, course: course)
  response.content = content
  response.save!
  response
end

# 8-10 Courses
courses_data = [
  {
    title: "Ruby Fundamentals",
    description: "Learn the core basics of Ruby including syntax, objects, and enumerables.",
    status: :published
  },
  {
    title: "Rails Fundamentals",
    description: "Understand the MVC pattern, routing, and basic app structure in Rails.",
    status: :published
  },
  {
    title: "Advanced ActiveRecord",
    description: "Master querying, polymorphic associations, and database optimization.",
    status: :published
  },
  {
    title: "REST API Design",
    description: "Best practices for building robust JSON APIs with Rails.",
    status: :published
  },
  {
    title: "Background Jobs with Sidekiq",
    description: "Process long-running tasks asynchronously using Redis and Sidekiq.",
    status: :published
  },
  {
    title: "Testing with RSpec",
    description: "Ensure your code works perfectly by writing behavior-driven tests.",
    status: :published
  },
  {
    title: "Authentication with JWT",
    description: "Secure your APIs using JSON Web Tokens (JWT).",
    status: :published
  },
  {
    title: "Database Optimization",
    description: "Tips and tricks for making your ActiveRecord queries lightning fast.",
    status: :archived
  },
  {
    title: "Legacy Systems Integration",
    description: "How to connect a modern Rails app to a 20-year-old database.",
    status: :archived
  }
]

courses = courses_data.map { |c| upsert_course(**c) }
ruby_course = courses.find { |c| c.title == "Ruby Fundamentals" }
rails_course = courses.find { |c| c.title == "Rails Fundamentals" }
api_course = courses.find { |c| c.title == "REST API Design" }
rspec_course = courses.find { |c| c.title == "Testing with RSpec" }
jwt_course = courses.find { |c| c.title == "Authentication with JWT" }

# Learners
learners_data = [
  { name: "John Doe", email: "john@example.com", password: "password123" },
  { name: "Sarah Smith", email: "sarah@example.com", password: "password123" },
  { name: "Mike Johnson", email: "mike@example.com", password: "password123" }
]

learners = learners_data.map { |l| upsert_learner(**l) }
john = learners.find { |l| l.email == "john@example.com" }
sarah = learners.find { |l| l.email == "sarah@example.com" }
mike = learners.find { |l| l.email == "mike@example.com" }

# Responses

# John has completed several courses
upsert_response(
  learner: john,
  course: ruby_course,
  content: "Completed all exercises and understood Ruby blocks. The section on procs versus lambdas was extremely helpful."
)

upsert_response(
  learner: john,
  course: rails_course,
  content: "Learned about Rails MVC architecture and routing. Built my first scaffold!"
)

upsert_response(
  learner: john,
  course: api_course,
  content: "Built a sample API using the concepts from this course. The serialization part was really interesting."
)

upsert_response(
  learner: john,
  course: jwt_course,
  content: "Integrated JWT auth into my personal project. Authentication was tricky but now makes perfect sense."
)

# Sarah has completed some courses
upsert_response(
  learner: sarah,
  course: ruby_course,
  content: "Great intro to Ruby. I really enjoyed the object-oriented programming concepts."
)

upsert_response(
  learner: sarah,
  course: rspec_course,
  content: "I finally understand how to write feature specs and model specs! TDD all the way."
)

# Mike has completed few or none (just one for example)
upsert_response(
  learner: mike,
  course: ruby_course,
  content: "A bit tough at first since I'm coming from Python, but I'm getting the hang of it."
)

puts "Seeded #{Course.count} courses, #{Learner.count} learners, and #{Response.count} total responses."
