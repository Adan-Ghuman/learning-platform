ruby = Course.create!(
  title: "Ruby Basics",
  description: "Learn Ruby fundamentals",
  status: :published
)

rails = Course.create!(
  title: "Rails Fundamentals",
  description: "Learn Rails",
  status: :published
)

learner = Learner.create!(
  name: "John Doe",
  email: "john@example.com"
)

Response.create!(
  learner: learner,
  course: ruby,
  content: "Completed the course"
)