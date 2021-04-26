require "application_system_test_case"

class CarDocumentsTest < ApplicationSystemTestCase
  setup do
    @car_document = car_documents(:one)
  end

  test "visiting the index" do
    visit car_documents_url
    assert_selector "h1", text: "Car Documents"
  end

  test "creating a Car document" do
    visit car_documents_url
    click_on "New Car Document"

    fill_in "Doc type", with: @car_document.doc_type
    check "Doc valid" if @car_document.doc_valid
    click_on "Create Car document"

    assert_text "Car document was successfully created"
    click_on "Back"
  end

  test "updating a Car document" do
    visit car_documents_url
    click_on "Edit", match: :first

    fill_in "Doc type", with: @car_document.doc_type
    check "Doc valid" if @car_document.doc_valid
    click_on "Update Car document"

    assert_text "Car document was successfully updated"
    click_on "Back"
  end

  test "destroying a Car document" do
    visit car_documents_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car document was successfully destroyed"
  end
end
