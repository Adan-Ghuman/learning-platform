require "rails_helper"

RSpec.describe "Learners API", type: :request do
  describe "GET /api/learners/:id/responses" do
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

    let!(:response_record) do
      Response.create!(
        learner: learner,
        course: course,
        content: "Completed"
      )
    end

    it "returns learner responses" do
      get "/api/learners/#{learner.id}/responses"

      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)

      expect(body.length).to eq(1)
      expect(body.first["content"]).to eq("Completed")
    end
  end
end