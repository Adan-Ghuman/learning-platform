require "rails_helper"

RSpec.describe "Courses API", type: :request do
  describe "GET /api/courses" do
    let!(:published_course) do
      Course.create!(
        title: "Ruby",
        description: "Ruby Course",
        status: :published
      )
    end

    let!(:archived_course) do
      Course.create!(
        title: "Old Ruby",
        description: "Old Course",
        status: :archived
      )
    end

    it "returns only published courses" do
      get "/api/courses"

      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)

      expect(body.length).to eq(1)
      expect(body.first["title"]).to eq("Ruby")
    end
  end
end