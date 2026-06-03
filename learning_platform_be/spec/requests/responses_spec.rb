require "rails_helper"

RSpec.describe "Responses API", type: :request do
  describe "POST /api/responses" do
    let!(:learner) do
      Learner.create!(
        name: "John",
        email: "john@example.com"
      )
    end

    let!(:course) do
      Course.create!(
        title: "Ruby",
        description: "Ruby Course",
        status: :published
      )
    end

    it "creates a response" do
      post "/api/responses",
           params: {
             learner_id: learner.id,
             course_id: course.id,
             content: "Completed"
           }

      expect(response).to have_http_status(:created)
      expect(Response.count).to eq(1)
    end
  end
end