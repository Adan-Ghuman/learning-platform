require "test_helper"

class Api::LearnersControllerTest < ActionDispatch::IntegrationTest
  test "should get responses" do
    get api_learners_responses_url
    assert_response :success
  end
end
