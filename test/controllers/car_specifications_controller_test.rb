require "test_helper"

class CarSpecificationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_specification = car_specifications(:one)
  end

  test "should get index" do
    get car_specifications_url
    assert_response :success
  end

  test "should get new" do
    get new_car_specification_url
    assert_response :success
  end

  test "should create car_specification" do
    assert_difference('CarSpecification.count') do
      post car_specifications_url, params: { car_specification: { body_type: @car_specification.body_type, car_id: @car_specification.car_id, comments: @car_specification.comments, description: @car_specification.description, doors: @car_specification.doors, fuel: @car_specification.fuel, gear_type: @car_specification.gear_type, mileage: @car_specification.mileage, seats: @car_specification.seats, status: @car_specification.status } }
    end

    assert_redirected_to car_specification_url(CarSpecification.last)
  end

  test "should show car_specification" do
    get car_specification_url(@car_specification)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_specification_url(@car_specification)
    assert_response :success
  end

  test "should update car_specification" do
    patch car_specification_url(@car_specification), params: { car_specification: { body_type: @car_specification.body_type, car_id: @car_specification.car_id, comments: @car_specification.comments, description: @car_specification.description, doors: @car_specification.doors, fuel: @car_specification.fuel, gear_type: @car_specification.gear_type, mileage: @car_specification.mileage, seats: @car_specification.seats, status: @car_specification.status } }
    assert_redirected_to car_specification_url(@car_specification)
  end

  test "should destroy car_specification" do
    assert_difference('CarSpecification.count', -1) do
      delete car_specification_url(@car_specification)
    end

    assert_redirected_to car_specifications_url
  end
end
