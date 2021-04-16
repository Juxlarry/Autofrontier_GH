require "test_helper"

class CarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car = cars(:one)
  end

  test "should get index" do
    get cars_url
    assert_response :success
  end

  test "should get new" do
    get new_car_url
    assert_response :success
  end

  test "should create car" do
    assert_difference('Car.count') do
      post cars_url, params: { car: { body_type_id: @car.body_type_id, car_name: @car.car_name, car_price: @car.car_price, car_registration_first_date: @car.car_registration_first_date, car_registration_number: @car.car_registration_number, car_type_id: @car.car_type_id, colour_id: @car.colour_id, comments: @car.comments, derivative_details: @car.derivative_details, description: @car.description, doors: @car.doors, fuel_type_id: @car.fuel_type_id, make_id: @car.make_id, mileage: @car.mileage, model_id: @car.model_id, seats: @car.seats, status: @car.status, transmission_type_id: @car.transmission_type_id, trim_details: @car.trim_details, variant_details: @car.variant_details } }
    end

    assert_redirected_to car_url(Car.last)
  end

  test "should show car" do
    get car_url(@car)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_url(@car)
    assert_response :success
  end

  test "should update car" do
    patch car_url(@car), params: { car: { body_type_id: @car.body_type_id, car_name: @car.car_name, car_price: @car.car_price, car_registration_first_date: @car.car_registration_first_date, car_registration_number: @car.car_registration_number, car_type_id: @car.car_type_id, colour_id: @car.colour_id, comments: @car.comments, derivative_details: @car.derivative_details, description: @car.description, doors: @car.doors, fuel_type_id: @car.fuel_type_id, make_id: @car.make_id, mileage: @car.mileage, model_id: @car.model_id, seats: @car.seats, status: @car.status, transmission_type_id: @car.transmission_type_id, trim_details: @car.trim_details, variant_details: @car.variant_details } }
    assert_redirected_to car_url(@car)
  end

  test "should destroy car" do
    assert_difference('Car.count', -1) do
      delete car_url(@car)
    end

    assert_redirected_to cars_url
  end
end
