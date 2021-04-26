require "test_helper"

class CarDocumentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_document = car_documents(:one)
  end

  test "should get index" do
    get car_documents_url
    assert_response :success
  end

  test "should get new" do
    get new_car_document_url
    assert_response :success
  end

  test "should create car_document" do
    assert_difference('CarDocument.count') do
      post car_documents_url, params: { car_document: { doc_type: @car_document.doc_type, doc_valid: @car_document.doc_valid } }
    end

    assert_redirected_to car_document_url(CarDocument.last)
  end

  test "should show car_document" do
    get car_document_url(@car_document)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_document_url(@car_document)
    assert_response :success
  end

  test "should update car_document" do
    patch car_document_url(@car_document), params: { car_document: { doc_type: @car_document.doc_type, doc_valid: @car_document.doc_valid } }
    assert_redirected_to car_document_url(@car_document)
  end

  test "should destroy car_document" do
    assert_difference('CarDocument.count', -1) do
      delete car_document_url(@car_document)
    end

    assert_redirected_to car_documents_url
  end
end
