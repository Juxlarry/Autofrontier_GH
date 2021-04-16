require "test_helper"

class CarTransmissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_transmission = car_transmissions(:one)
  end

  test "should get index" do
    get car_transmissions_url
    assert_response :success
  end

  test "should get new" do
    get new_car_transmission_url
    assert_response :success
  end

  test "should create car_transmission" do
    assert_difference('CarTransmission.count') do
      post car_transmissions_url, params: { car_transmission: { comments: @car_transmission.comments, name: @car_transmission.name, status: @car_transmission.status } }
    end

    assert_redirected_to car_transmission_url(CarTransmission.last)
  end

  test "should show car_transmission" do
    get car_transmission_url(@car_transmission)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_transmission_url(@car_transmission)
    assert_response :success
  end

  test "should update car_transmission" do
    patch car_transmission_url(@car_transmission), params: { car_transmission: { comments: @car_transmission.comments, name: @car_transmission.name, status: @car_transmission.status } }
    assert_redirected_to car_transmission_url(@car_transmission)
  end

  test "should destroy car_transmission" do
    assert_difference('CarTransmission.count', -1) do
      delete car_transmission_url(@car_transmission)
    end

    assert_redirected_to car_transmissions_url
  end
end
