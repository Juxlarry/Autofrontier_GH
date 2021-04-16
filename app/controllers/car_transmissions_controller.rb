class CarTransmissionsController < ApplicationController
  before_action :set_car_transmission, only: %i[ show edit update destroy ]

  # GET /car_transmissions or /car_transmissions.json
  def index
    @car_transmissions = CarTransmission.all
  end

  # GET /car_transmissions/1 or /car_transmissions/1.json
  def show
  end

  # GET /car_transmissions/new
  def new
    @car_transmission = CarTransmission.new
  end

  # GET /car_transmissions/1/edit
  def edit
  end

  # POST /car_transmissions or /car_transmissions.json
  def create
    @car_transmission = CarTransmission.new(car_transmission_params)

    respond_to do |format|
      if @car_transmission.save
        format.html { redirect_to @car_transmission, notice: "Car transmission was successfully created." }
        format.json { render :show, status: :created, location: @car_transmission }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_transmission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_transmissions/1 or /car_transmissions/1.json
  def update
    respond_to do |format|
      if @car_transmission.update(car_transmission_params)
        format.html { redirect_to @car_transmission, notice: "Car transmission was successfully updated." }
        format.json { render :show, status: :ok, location: @car_transmission }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_transmission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_transmissions/1 or /car_transmissions/1.json
  def destroy
    @car_transmission.destroy
    respond_to do |format|
      format.html { redirect_to car_transmissions_url, notice: "Car transmission was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_transmission
      @car_transmission = CarTransmission.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_transmission_params
      params.require(:car_transmission).permit(:name, :status, :comments)
    end
end
