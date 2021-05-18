require "application_system_test_case"

class NewsletterRequestsTest < ApplicationSystemTestCase
  setup do
    @newsletter_request = newsletter_requests(:one)
  end

  test "visiting the index" do
    visit newsletter_requests_url
    assert_selector "h1", text: "Newsletter Requests"
  end

  test "creating a Newsletter request" do
    visit newsletter_requests_url
    click_on "New Newsletter Request"

    fill_in "Email", with: @newsletter_request.email
    fill_in "Status", with: @newsletter_request.status
    click_on "Create Newsletter request"

    assert_text "Newsletter request was successfully created"
    click_on "Back"
  end

  test "updating a Newsletter request" do
    visit newsletter_requests_url
    click_on "Edit", match: :first

    fill_in "Email", with: @newsletter_request.email
    fill_in "Status", with: @newsletter_request.status
    click_on "Update Newsletter request"

    assert_text "Newsletter request was successfully updated"
    click_on "Back"
  end

  test "destroying a Newsletter request" do
    visit newsletter_requests_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Newsletter request was successfully destroyed"
  end
end
