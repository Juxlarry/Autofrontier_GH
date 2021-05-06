class VehicleenquiriesController < ApplicationController
  before_action :set_vehicleenquiry, only: %i[ show edit update destroy ]

  # GET /vehicleenquiries or /vehicleenquiries.json
  def index
    @vehicleenquiries = Vehicleenquiry.all
  end

  # GET /vehicleenquiries/1 or /vehicleenquiries/1.json
  def show
  end

  # GET /vehicleenquiries/new
  def new
    @vehicleenquiry = Vehicleenquiry.new
  end

  # GET /vehicleenquiries/1/edit
  def edit
  end

  # POST /vehicleenquiries or /vehicleenquiries.json
  def create
    @vehicleenquiry = Vehicleenquiry.new(vehicleenquiry_params)

    respond_to do |format|
      if @vehicleenquiry.save
        format.html { redirect_back fallback_location: '/', notice: "Vehicleenquiry was successfully created." }
        format.json { render :show, status: :created, location: @vehicleenquiry }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @vehicleenquiry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vehicleenquiries/1 or /vehicleenquiries/1.json
  def update
    respond_to do |format|
      if @vehicleenquiry.update(vehicleenquiry_params)
        format.html { redirect_to @vehicleenquiry, notice: "Vehicleenquiry was successfully updated." }
        format.json { render :show, status: :ok, location: @vehicleenquiry }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @vehicleenquiry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vehicleenquiries/1 or /vehicleenquiries/1.json
  def destroy
    @vehicleenquiry.destroy
    respond_to do |format|
      format.html { redirect_to vehicleenquiries_url, notice: "Vehicleenquiry was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vehicleenquiry
      @vehicleenquiry = Vehicleenquiry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vehicleenquiry_params
      params.require(:vehicleenquiry).permit(:firstname, :lastname, :email, :phonenumber, :message, :status, :enquirer_user_id, :vehicle_user_id)
    end
end
