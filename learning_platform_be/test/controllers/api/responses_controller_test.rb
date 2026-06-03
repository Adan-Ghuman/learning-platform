require "test_helper"

class Api::ResponsesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_responses_create_url
    assert_response :success
  end
end
