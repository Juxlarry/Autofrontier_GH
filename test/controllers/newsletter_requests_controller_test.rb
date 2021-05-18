require "test_helper"

class NewsletterRequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @newsletter_request = newsletter_requests(:one)
  end

  test "should get index" do
    get newsletter_requests_url
    assert_response :success
  end

  test "should get new" do
    get new_newsletter_request_url
    assert_response :success
  end

  test "should create newsletter_request" do
    assert_difference('NewsletterRequest.count') do
      post newsletter_requests_url, params: { newsletter_request: { email: @newsletter_request.email, status: @newsletter_request.status } }
    end

    assert_redirected_to newsletter_request_url(NewsletterRequest.last)
  end

  test "should show newsletter_request" do
    get newsletter_request_url(@newsletter_request)
    assert_response :success
  end

  test "should get edit" do
    get edit_newsletter_request_url(@newsletter_request)
    assert_response :success
  end

  test "should update newsletter_request" do
    patch newsletter_request_url(@newsletter_request), params: { newsletter_request: { email: @newsletter_request.email, status: @newsletter_request.status } }
    assert_redirected_to newsletter_request_url(@newsletter_request)
  end

  test "should destroy newsletter_request" do
    assert_difference('NewsletterRequest.count', -1) do
      delete newsletter_request_url(@newsletter_request)
    end

    assert_redirected_to newsletter_requests_url
  end
end
